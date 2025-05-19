#!/usr/bin/env node

import { Command } from 'commander';
import inquirer, { QuestionCollection } from 'inquirer';
import * as fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { SiteConfig, SEOConfig, BusinessInfo, ContactInfo, Service, Testimonial, SocialLink, CTASection } from '../src/config/siteConfig';
import { templates, residentialTemplate, commercialTemplate, emergencyTemplate, TemplateType } from './templates';

const program = new Command();

interface CreateSiteOptions {
  dir: string;
  verbose?: boolean;
}

function log(message: string, options: CreateSiteOptions, level: 'info' | 'debug' = 'info') {
  if (level === 'info' || (level === 'debug' && options.verbose)) {
    console.log(message);
  }
}

// Recursive deep merge function
function deepMerge(target: any, source: any): any {
    const output = { ...target };
    if (source === null || typeof source !== 'object') {
        return source;
    }

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!output[key]) {
                    output[key] = {};
                }
                output[key] = deepMerge(output[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }
    }
    return output;
}

async function promptForSiteConfig(options: CreateSiteOptions): Promise<SiteConfig> {
  log(chalk.blue('Please provide site configuration details:'), options);

  const templateChoices = Object.keys(templates).map(key => ({
    name: `${key.charAt(0).toUpperCase()}${key.slice(1)} Template`,
    value: key as TemplateType,
    description: `Uses the predefined configuration for a ${key} plumbing business.`
  }));

  const templateQuestion: QuestionCollection = [{
    type: 'list',
    name: 'templateType',
    message: 'Choose a template:',
    choices: templateChoices,
    loop: false,
  }];

  const templateAnswer = await inquirer.prompt(templateQuestion);
  const selectedTemplateType = templateAnswer.templateType as TemplateType;

  let baseConfig: Partial<SiteConfig> = {};
  switch (selectedTemplateType) {
    case 'residential':
      baseConfig = residentialTemplate;
      break;
    case 'commercial':
      baseConfig = commercialTemplate;
      break;
    case 'emergency':
      baseConfig = emergencyTemplate;
      break;
  }

  log(chalk.blue(`Using ${selectedTemplateType} template.`), options);

  const questions: QuestionCollection = [
    {
      type: 'input',
      name: 'business.name',
      message: 'Business Name:',
      validate: (input: string) => input.length > 0 ? true : 'Business name is required',
      default: baseConfig.business?.name,
    },
    {
      type: 'input',
      name: 'business.slogan',
      message: 'Business Slogan:',
      default: baseConfig.business?.slogan,
    },
    {
      type: 'input',
      name: 'business.description',
      message: 'Business Description:',
      default: baseConfig.business?.description,
    },
    {
      type: 'input',
      name: 'business.industry',
      message: 'Industry:',
      default: baseConfig.business?.industry || 'plumbing',
    },
    {
      type: 'input',
      name: 'business.city',
      message: 'City:',
      validate: (input: string) => input.length > 0 ? true : 'City is required',
      default: baseConfig.business?.city,
    },
    {
      type: 'input',
      name: 'business.state',
      message: 'State (2-letter code):',
      validate: (input: string) => /^[A-Z]{2}$/.test(input) ? true : 'Please enter a valid 2-letter state code',
      default: baseConfig.business?.state,
    },
    {
      type: 'input',
      name: 'business.zip',
      message: 'ZIP Code:',
      validate: (input: string) => input.length > 0 ? true : 'ZIP Code is required',
      default: baseConfig.business?.zip,
    },
    {
      type: 'input',
      name: 'contact.phone',
      message: 'Phone Number:',
      validate: (input: string) => /^\(\d{3}\) \d{3}-\d{4}$/.test(input) ? true : 'Please enter phone in format (XXX) XXX-XXXX',
      default: baseConfig.contact?.phone,
    },
    {
      type: 'input',
      name: 'contact.email',
      message: 'Email:',
      validate: (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) ? true : 'Please enter a valid email address',
      default: baseConfig.contact?.email,
    },
    {
      type: 'input',
      name: 'contact.address',
      message: 'Business Address:',
      validate: (input: string) => input.length > 0 ? true : 'Business Address is required',
      default: baseConfig.contact?.address,
    },
    {
      type: 'input',
      name: 'business.brandColors.primary',
      message: 'Primary Brand Color (hex):',
      validate: (input: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input) ? true : 'Please enter a valid hex color (e.g., #RRGGBB or #RGB)',
      default: baseConfig.business?.brandColors?.primary || '#0D6EFD',
    },
    {
      type: 'input',
      name: 'business.brandColors.secondary',
      message: 'Secondary Brand Color (hex):',
      validate: (input: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input) ? true : 'Please enter a valid hex color (e.g., #RRGGBB or #RGB)',
      default: baseConfig.business?.brandColors?.secondary || '#6C757D',
    },
    {
      type: 'input',
      name: 'business.brandColors.accent',
      message: 'Accent Brand Color (hex):',
      validate: (input: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input) ? true : 'Please enter a valid hex color (e.g., #RRGGBB or #RGB)',
      default: baseConfig.business?.brandColors?.accent || '#FFC107',
    },
  ];

  const answers = await inquirer.prompt(questions);

  // Deep merge baseConfig with user answers
  const mergedConfig = deepMerge(baseConfig, answers);

  // Provide default empty arrays/objects for properties not covered by prompts or template
  // This ensures the final config adheres to the SiteConfig structure
  const defaultConfig: SiteConfig = {
    business: {
        name: '', slogan: '', description: '', industry: 'plumbing', logo: '/images/logo.svg', founded: undefined, owner: undefined,
        certifications: [], licenses: [], insurance: [], serviceArea: [], city: '', state: '', zip: '',
        brandColors: { primary: '#0D6EFD', secondary: '#6C757D', accent: '#FFC107' }, hours: ['Mo-Fr 08:00-17:00']
    } as BusinessInfo,
    contact: {
        phone: '', email: '', address: '', hours: 'Monday - Friday: 8:00 AM - 5:00 PM', emergencyPhone: undefined, emergencyHours: undefined, whatsapp: undefined,
        serviceArea: []
    } as ContactInfo,
    services: [] as Service[],
    testimonials: [] as Testimonial[],
    social: [] as SocialLink[],
    seo: {
        title: '', description: '', keywords: [], ogImage: undefined, twitterHandle: undefined,
        schema: {
            type: 'LocalBusiness', // Default schema type
            priceRange: undefined, openingHours: undefined, paymentAccepted: undefined, areaServed: undefined
        } as SEOConfig['schema'] // Cast schema to its specific type
    } as SEOConfig,
    cta: {
        primary: { title: '', description: '', buttonText: '', buttonLink: '', emergency: undefined, backgroundColor: undefined } as CTASection,
        emergency: undefined,
        quote: undefined,
    },
    trust: {
        certifications: [], awards: [], memberships: [], guarantees: []
    },
    images: {
        hero: '', about: '', services: [], team: undefined, gallery: undefined
    } as SiteConfig['images'], // Cast images to its specific type
  };

  // Deep merge with default config to ensure all properties exist with empty arrays/objects if not provided
  const finalConfig = deepMerge(defaultConfig, mergedConfig);

  // Ensure schema.type is one of the allowed literals after merge
  if (finalConfig.seo.schema && !('LocalBusiness' in finalConfig.seo.schema) && !('ServiceBusiness' in finalConfig.seo.schema)) {
       finalConfig.seo.schema.type = 'LocalBusiness'; // Default to LocalBusiness if not specified or invalid
  }

  return finalConfig as SiteConfig; // Cast the final result to SiteConfig
}

async function createNewSite(siteName: string, options: CreateSiteOptions) {
  let fullPath = '';
  try {
    log(chalk.blue(`Attempting to create site: ${siteName} in ${options.dir}`), options, 'debug');
    // Validate site name
    if (!/^[a-z0-9-]+$/.test(siteName)) {
      throw new Error('Site name must contain only lowercase letters, numbers, and hyphens.');
    }

    // Create target directory
    fullPath = path.resolve(options.dir, siteName);
    log(chalk.blue(`Resolved target path: ${fullPath}`), options, 'debug');

    if (fs.existsSync(fullPath)) {
      throw new Error(`Directory ${fullPath} already exists. Please choose a different site name or target directory.`);
    }

    log(chalk.blue(`Creating site directory: ${fullPath}`), options, 'debug');
    await fs.ensureDir(fullPath);

    log(chalk.blue(`Creating new site: ${siteName}`), options);

    // Copy template files
    console.log(chalk.blue('Copying template files...'));
    await fs.copy(path.resolve(__dirname, '..'), fullPath, {
      filter: (src: string) => {
        const relativeSrc = path.relative(path.resolve(__dirname, '..'), src);
        const excludePatterns = [
          '.git',
          'node_modules',
          '.next',
          'dist',
          'scripts/templates', // Exclude template files themselves
          'package-lock.json',
          'tsconfig.tsbuildinfo',
          'README.md', // Will generate a new README
          'siteConfig.ts' // Will generate a new siteConfig
        ];

        const shouldExclude = excludePatterns.some(pattern => relativeSrc.includes(pattern) || src.endsWith(pattern));

        if (options.verbose && shouldExclude) {
          log(chalk.yellow(`Excluding: ${relativeSrc}`), options, 'debug');
        } else if (options.verbose && !shouldExclude) {
          log(chalk.cyan(`Including: ${relativeSrc}`), options, 'debug');
        }

        return !shouldExclude;
      },
    });

    // Get site configuration
    console.log(chalk.blue('Please provide site configuration details:'));
    const siteConfig = await promptForSiteConfig(options);

    // Update siteConfig.ts
    const configPath = path.join(fullPath, 'src/config/siteConfig.ts');
    log(chalk.blue(`Writing site configuration to ${configPath}`), options, 'debug');
    // Need to stringify the siteConfig object, ensuring correct type usage.
    // JSON.stringify might not handle all cases, but for this structure it should work.
    const configContent = `import { SiteConfig } from './siteConfig';\n\nconst siteConfig: SiteConfig = ${JSON.stringify(siteConfig, null, 2)};\n\nexport default siteConfig;\n`;
    await fs.writeFile(configPath, configContent);

    // Create a basic README.md for the new site instance
    const readmePath = path.join(fullPath, 'README.md');
    const readmeContent = `# ${siteName}

This is a new plumbing website instance created from the template.

## Getting Started

1. Navigate to the site directory:

   \`\`\`bash
   cd ${siteName}
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Customize the site configuration in \`src/config/siteConfig.ts\`

4. Add your logo and images to \`public/images/\`

5. Run the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

## Updating

To update this site instance from the main template, use the \`update-plumbing-sites\` CLI tool.

\`\`\`bash
update-plumbing-sites ${siteName} /path/to/your/plumbing-template --dry-run
\`\`\`

Review the changes and remove \`--dry-run\` to apply.
`;
    await fs.writeFile(readmePath, readmeContent);
    log(chalk.blue(`Created README.md for ${siteName}`), options, 'debug');

    // Initialize git repository
    console.log(chalk.blue('Initializing git repository...'));
    try {
      execSync('git init', { cwd: fullPath });
      log(chalk.green('Git repository initialized.'), options, 'debug');
    } catch (gitError) {
      log(chalk.yellow('Could not initialize git repository. This may be due to running in an environment that doesn\'t have git installed or configured.'), options, 'debug');
    }

    // Install dependencies
    console.log(chalk.blue('Installing dependencies...'));
    try {
      execSync('npm install', { cwd: fullPath });
      log(chalk.green('Dependencies installed.'), options, 'debug');
    } catch (npmInstallError) {
      log(chalk.red('Error installing dependencies. Please run `npm install` manually in the site directory.'), options);
      log(chalk.red(`Error details: ${npmInstallError}`), options, 'debug');
    }

    // Build the project
    console.log(chalk.blue('Building project...'), options);
    try {
        execSync('npm run build', { cwd: fullPath });
        log(chalk.green('Project built successfully.'), options, 'debug');
    } catch (buildError: any) {
         log(chalk.yellow('Error building the project. Please run `npm run build` manually in the site directory.'), options);
         log(chalk.yellow(`Error details: ${buildError.message || buildError}`), options, 'debug');
    }

    console.log(chalk.green(`\n✅ Successfully created new site: ${siteName}`));
    console.log(chalk.green(`\nNext steps:`));
    console.log(chalk.green(`1. cd ${siteName}`));
    console.log(chalk.green('2. Review and customize siteConfig.ts'));
    console.log(chalk.green('3. Add your logo and images to public/images/'));
    console.log(chalk.green('4. Run "npm run dev" to start development server'));
    console.log(chalk.green('5. Deploy to your hosting provider'));

  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else if (error !== null && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        errorMessage = error.message;
    }

    console.error(chalk.red('\nError creating new site:'), errorMessage);

    if (options.verbose) {
        console.error(chalk.red('Full error details:'), error);
    }
    // Clean up created directory if an error occurred
    if (fullPath && fs.existsSync(fullPath)) {
        log(chalk.yellow(`Cleaning up directory: ${fullPath}`), options, 'debug');
        await fs.remove(fullPath);
    }
    process.exit(1);
  }
}

program
  .name('create-plumbing-site')
  .description('CLI tool to create new website instances from the template')
  .argument('<site-name>', 'Name of the new site (lowercase, hyphenated)')
  .option('-d, --dir <directory>', 'Target directory for the new site', process.cwd())
  .action(createNewSite);

program.parse(); 