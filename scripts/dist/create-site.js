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
async function promptForSiteConfig() {
    const questions = [
        {
            type: 'input',
            name: 'business.name',
            message: 'Business Name:',
            validate: (input) => input.length > 0 || 'Business name is required',
        },
        {
            type: 'input',
            name: 'business.slogan',
            message: 'Business Slogan:',
        },
        {
            type: 'input',
            name: 'business.description',
            message: 'Business Description:',
        },
        {
            type: 'input',
            name: 'business.industry',
            message: 'Industry:',
            default: 'plumbing',
        },
        {
            type: 'input',
            name: 'business.city',
            message: 'City:',
        },
        {
            type: 'input',
            name: 'business.state',
            message: 'State (2-letter code):',
            validate: (input) => /^[A-Z]{2}$/.test(input) || 'Please enter a valid 2-letter state code',
        },
        {
            type: 'input',
            name: 'business.zip',
            message: 'ZIP Code:',
        },
        {
            type: 'input',
            name: 'contact.phone',
            message: 'Phone Number:',
            validate: (input) => /^\(\d{3}\) \d{3}-\d{4}$/.test(input) || 'Please enter phone in format (XXX) XXX-XXXX',
        },
        {
            type: 'input',
            name: 'contact.email',
            message: 'Email:',
            validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || 'Please enter a valid email address',
        },
        {
            type: 'input',
            name: 'contact.address',
            message: 'Business Address:',
        },
        {
            type: 'input',
            name: 'business.brandColors.primary',
            message: 'Primary Brand Color (hex):',
            default: '#0D6EFD',
        },
        {
            type: 'input',
            name: 'business.brandColors.secondary',
            message: 'Secondary Brand Color (hex):',
            default: '#6C757D',
        },
        {
            type: 'input',
            name: 'business.brandColors.accent',
            message: 'Accent Brand Color (hex):',
            default: '#FFC107',
        },
    ];
    const answers = await inquirer_1.default.prompt(questions);
    // Transform the flat answers into nested config object
    const config = {
        business: {
            name: answers['business.name'],
            slogan: answers['business.slogan'],
            description: answers['business.description'],
            industry: answers['business.industry'],
            logo: '/images/logo.svg', // Default logo path
            city: answers['business.city'],
            state: answers['business.state'],
            zip: answers['business.zip'],
            brandColors: {
                primary: answers['business.brandColors.primary'],
                secondary: answers['business.brandColors.secondary'],
                accent: answers['business.brandColors.accent'],
            },
            certifications: [],
            licenses: [],
            insurance: [],
            serviceArea: [],
            hours: ['Mo-Fr 08:00-17:00'],
        },
        contact: {
            phone: answers['contact.phone'],
            email: answers['contact.email'],
            address: answers['contact.address'],
            hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
            serviceArea: [],
        },
    };
    return config;
}
async function createNewSite(siteName, targetDir) {
    try {
        // Validate site name
        if (!/^[a-z0-9-]+$/.test(siteName)) {
            throw new Error('Site name must contain only lowercase letters, numbers, and hyphens');
        }
        // Create target directory
        const fullPath = path_1.default.resolve(targetDir, siteName);
        if (fs.existsSync(fullPath)) {
            throw new Error(`Directory ${fullPath} already exists`);
        }
        console.log(chalk_1.default.blue(`Creating new site: ${siteName}`));
        // Copy template files
        console.log(chalk_1.default.blue('Copying template files...'));
        await fs.copy(path_1.default.resolve(__dirname, '..'), fullPath, {
            filter: (src) => {
                // Exclude certain directories and files
                const excludeDirs = ['.git', 'node_modules', '.next', 'dist'];
                const excludeFiles = ['package-lock.json'];
                return !excludeDirs.some(dir => src.includes(dir)) &&
                    !excludeFiles.some(file => src.endsWith(file));
            },
        });
        // Get site configuration
        console.log(chalk_1.default.blue('Please provide site configuration details:'));
        const siteConfig = await promptForSiteConfig();
        // Update siteConfig.ts
        const configPath = path_1.default.join(fullPath, 'src/config/siteConfig.ts');
        const configContent = `import { SiteConfig } from './types';

const siteConfig: SiteConfig = ${JSON.stringify(siteConfig, null, 2)};

export default siteConfig;
`;
        await fs.writeFile(configPath, configContent);
        // Initialize git repository
        console.log(chalk_1.default.blue('Initializing git repository...'));
        (0, child_process_1.execSync)('git init', { cwd: fullPath });
        // Install dependencies
        console.log(chalk_1.default.blue('Installing dependencies...'));
        (0, child_process_1.execSync)('npm install', { cwd: fullPath });
        // Build the project
        console.log(chalk_1.default.blue('Building project...'));
        (0, child_process_1.execSync)('npm run build', { cwd: fullPath });
        console.log(chalk_1.default.green(`\n✅ Successfully created new site: ${siteName}`));
        console.log(chalk_1.default.green(`\nNext steps:`));
        console.log(chalk_1.default.green(`1. cd ${siteName}`));
        console.log(chalk_1.default.green('2. Review and customize siteConfig.ts'));
        console.log(chalk_1.default.green('3. Add your logo and images to public/images/'));
        console.log(chalk_1.default.green('4. Run "npm run dev" to start development server'));
        console.log(chalk_1.default.green('5. Deploy to your hosting provider'));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error creating new site:'), error);
        process.exit(1);
    }
}
program
    .name('create-site')
    .description('CLI tool to create new website instances from the template')
    .argument('<site-name>', 'Name of the new site (lowercase, hyphenated)')
    .option('-d, --dir <directory>', 'Target directory for the new site', process.cwd())
    .action(createNewSite);
program.parse();
