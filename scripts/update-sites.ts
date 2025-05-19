#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { diff } from 'diff';

const program = new Command();

interface SiteInfo {
  name: string;
  path: string;
  version: string;
}

interface UpdateSiteOptions {
  dryRun: boolean;
  verbose?: boolean;
}

function log(message: string, options: UpdateSiteOptions, level: 'info' | 'debug' = 'info') {
  if (level === 'info' || (level === 'debug' && options.verbose)) {
    console.log(message);
  }
}

async function findSites(baseDir: string, options: UpdateSiteOptions): Promise<SiteInfo[]> {
  log(chalk.blue(`Searching for website instances in ${baseDir}`), options, 'debug');
  const sites: SiteInfo[] = [];
  let entries: fs.Dirent[];
  try {
    entries = await fs.readdir(baseDir, { withFileTypes: true });
  } catch (error) {
    log(chalk.red(`Error reading directory ${baseDir}: ${error}`), options, 'debug');
    throw new Error(`Could not read directory: ${baseDir}. Please ensure the path is correct.`);
  }
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sitePath = path.join(baseDir, entry.name);
      const packageJsonPath = path.join(sitePath, 'package.json');
      
      if (await fs.pathExists(packageJsonPath)) {
        try {
          const packageJson = await fs.readJson(packageJsonPath);
          if (packageJson.name?.includes('plumbing-website')) {
            sites.push({
              name: entry.name,
              path: sitePath,
              version: packageJson.version || 'unknown'
            });
          }
        } catch (error) {
          console.warn(chalk.yellow(`Warning: Could not read package.json in ${entry.name}`));
        }
      }
    }
  }
  
  return sites;
}

async function updateSite(site: SiteInfo, templateDir: string, options: UpdateSiteOptions) {
  log(chalk.blue(`\nUpdating site: ${site.name}`), options);
  log(chalk.blue(`Site path: ${site.path}`), options, 'debug');
  log(chalk.blue(`Template path: ${templateDir}`), options, 'debug');
  
  try {
    // Create a backup
    if (!options.dryRun) {
      const backupDir = path.join(site.path, 'backup', new Date().toISOString().replace(/[:.]/g, '-'));
      log(chalk.blue('Creating backup...'), options);
      await fs.copy(site.path, backupDir, {
        filter: (src: string) => {
          const excludeDirs = ['.git', 'node_modules', '.next', 'dist', 'backup'];
          return !excludeDirs.some(dir => src.includes(dir));
        }
      });
    }

    // Files to copy from template (excluding client-specific files)
    const filesToCopy = [
      'src/components',
      'src/app',
      'src/styles',
      'src/utils',
      'public/images/template',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
      'tsconfig.json',
      'package.json',
      'README.md'
    ];

    // Copy template files with conflict detection
    log(chalk.blue('Copying template files...'), options);
    for (const file of filesToCopy) {
      const sourcePath = path.join(templateDir, file);
      const targetPath = path.join(site.path, file);
      const relativePath = path.relative(site.path, targetPath);
      
      const sourceExists = await fs.pathExists(sourcePath);
      const targetExists = await fs.pathExists(targetPath);

      if (!sourceExists) {
        log(chalk.yellow(`Template file not found, skipping: ${relativePath}`), options, 'debug');
        continue;
      }

      if (targetExists) {
        // Basic conflict detection: check if files are different
        const sourceContent = await fs.readFile(sourcePath, 'utf-8');
        const targetContent = await fs.readFile(targetPath, 'utf-8');

        if (sourceContent !== targetContent) {
          log(chalk.yellow(`Potential conflict: ${relativePath} exists and differs from template.`), options);
          if (options.dryRun) {
            log(chalk.yellow('  (Dry run) This file would be overwritten.'), options);
            // Optional: show diff in verbose dry run mode
            if (options.verbose) {
              const changes = diff(targetContent, sourceContent);
              console.log(chalk.yellow('--- Diff ---'));
              changes.forEach((part) => {
                // green for additions, red for deletions, grey for common parts
                const color = part.added ? chalk.green :
                  part.removed ? chalk.red : chalk.gray;
                console.log(color(part.value));
              });
              console.log(chalk.yellow('---'));
            }
          } else {
            log(chalk.yellow('  Overwriting existing file.'), options);
            await fs.copy(sourcePath, targetPath, { overwrite: true });
            log(chalk.green(`Overwritten: ${relativePath}`), options, 'debug');
          }
        } else {
          log(chalk.gray(`Skipping: ${relativePath} already exists and is identical to template.`), options, 'debug');
        }
      } else {
        if (options.dryRun) {
          log(chalk.gray(`Would create: ${relativePath}`), options);
        } else {
          await fs.copy(sourcePath, targetPath, { overwrite: true });
          log(chalk.green(`Copied: ${relativePath}`), options, 'debug');
        }
      }
    }

    // Update dependencies
    if (!options.dryRun) {
      log(chalk.blue('Updating dependencies...'), options);
      try {
        execSync('npm install', { cwd: site.path });
        log(chalk.green('Dependencies installed.'), options, 'debug');
      } catch (npmInstallError) {
        log(chalk.red('Error installing dependencies. Please run `npm install` manually in the site directory.'), options);
        log(chalk.red(`Error details: ${npmInstallError}`), options, 'debug');
      }
      
      // Build the project
      log(chalk.blue('Building project...'), options);
      try {
        execSync('npm run build', { cwd: site.path });
        log(chalk.green('Project built successfully.'), options, 'debug');
      } catch (buildError) {
        log(chalk.yellow('Error building the project. Please run `npm run build` manually in the site directory.'), options);
        log(chalk.yellow(`Error details: ${buildError}`), options, 'debug');
      }
    }

    console.log(chalk.green(`✅ Successfully updated site: ${site.name}`));
  } catch (error: any) {
    console.error(chalk.red(`Error updating site ${site.name}:`), error.message);
    if (options.verbose) {
      console.error(chalk.red('Full error details:'), error);
    }
  }
}

async function updateAllSites(baseDir: string, templateDir: string, options: UpdateSiteOptions) {
  log(chalk.blue('Starting batch update process...'), options, 'debug');
  try {
    // Find all plumbing website instances
    console.log(chalk.blue('Finding website instances...'));
    const sites = await findSites(baseDir, options);
    
    if (sites.length === 0) {
      console.log(chalk.yellow('No plumbing website instances found.'));
      return;
    }

    // Display found sites
    console.log(chalk.blue('\nFound the following sites:'));
    sites.forEach(site => {
      console.log(chalk.blue(`- ${site.name} (version: ${site.version})`));
    });

    // Confirm update
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Proceed with updating ${sites.length} site(s)?`,
        default: false
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Update cancelled.'));
      return;
    }

    // Update each site
    for (const site of sites) {
      await updateSite(site, templateDir, options);
    }

    console.log(chalk.green('\n✅ Update process completed!'));
    if (options.dryRun) {
      console.log(chalk.yellow('\nThis was a dry run. No changes were made.'));
    }
  } catch (error: any) {
    console.error(chalk.red('Error during update process:'), error.message);
    if (options.verbose) {
      console.error(chalk.red('Full error details:'), error);
    }
    process.exit(1);
  }
}

program
  .name('update-plumbing-sites')
  .description('Update multiple plumbing website instances to a new template version')
  .argument('<base-dir>', 'Base directory containing website instances')
  .argument('<template-dir>', 'Directory containing the template code')
  .option('-d, --dry-run', 'Show what would be updated without making changes', false)
  .option('-v, --verbose', 'Enable verbose logging')
  .action(updateAllSites);

program.parse(); 