#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
async function findSites(baseDir) {
    const sites = [];
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const sitePath = path_1.default.join(baseDir, entry.name);
            const packageJsonPath = path_1.default.join(sitePath, 'package.json');
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
                }
                catch (error) {
                    console.warn(chalk_1.default.yellow(`Warning: Could not read package.json in ${entry.name}`));
                }
            }
        }
    }
    return sites;
}
async function updateSite(site, templateDir, dryRun) {
    console.log(chalk_1.default.blue(`\nUpdating site: ${site.name}`));
    try {
        // Create a backup
        if (!dryRun) {
            const backupDir = path_1.default.join(site.path, 'backup', new Date().toISOString().replace(/[:.]/g, '-'));
            console.log(chalk_1.default.blue('Creating backup...'));
            await fs.copy(site.path, backupDir, {
                filter: (src) => {
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
        // Copy template files
        console.log(chalk_1.default.blue('Copying template files...'));
        for (const file of filesToCopy) {
            const sourcePath = path_1.default.join(templateDir, file);
            const targetPath = path_1.default.join(site.path, file);
            if (await fs.pathExists(sourcePath)) {
                if (dryRun) {
                    console.log(chalk_1.default.gray(`Would copy: ${file}`));
                }
                else {
                    await fs.copy(sourcePath, targetPath, { overwrite: true });
                    console.log(chalk_1.default.green(`Copied: ${file}`));
                }
            }
        }
        // Update dependencies
        if (!dryRun) {
            console.log(chalk_1.default.blue('Updating dependencies...'));
            (0, child_process_1.execSync)('npm install', { cwd: site.path });
            // Build the project
            console.log(chalk_1.default.blue('Building project...'));
            (0, child_process_1.execSync)('npm run build', { cwd: site.path });
        }
        console.log(chalk_1.default.green(`✅ Successfully updated site: ${site.name}`));
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error updating site ${site.name}:`), error);
    }
}
async function updateAllSites(baseDir, templateDir, options) {
    try {
        // Find all plumbing website instances
        console.log(chalk_1.default.blue('Finding website instances...'));
        const sites = await findSites(baseDir);
        if (sites.length === 0) {
            console.log(chalk_1.default.yellow('No plumbing website instances found.'));
            return;
        }
        // Display found sites
        console.log(chalk_1.default.blue('\nFound the following sites:'));
        sites.forEach(site => {
            console.log(chalk_1.default.blue(`- ${site.name} (version: ${site.version})`));
        });
        // Confirm update
        const { confirm } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Proceed with updating ${sites.length} site(s)?`,
                default: false
            }
        ]);
        if (!confirm) {
            console.log(chalk_1.default.yellow('Update cancelled.'));
            return;
        }
        // Update each site
        for (const site of sites) {
            await updateSite(site, templateDir, options.dryRun);
        }
        console.log(chalk_1.default.green('\n✅ Update process completed!'));
        if (options.dryRun) {
            console.log(chalk_1.default.yellow('\nThis was a dry run. No changes were made.'));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error during update process:'), error);
        process.exit(1);
    }
}
program
    .name('update-sites')
    .description('Update multiple plumbing website instances to a new template version')
    .argument('<base-dir>', 'Base directory containing website instances')
    .argument('<template-dir>', 'Directory containing the template code')
    .option('-d, --dry-run', 'Show what would be updated without making changes', false)
    .action(updateAllSites);
program.parse();
