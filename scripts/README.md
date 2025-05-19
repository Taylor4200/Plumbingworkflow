# Plumbing Website CLI Tools

This package provides two CLI tools for managing plumbing website instances:

1. `create-plumbing-site`: Creates new website instances from the template
2. `update-plumbing-sites`: Updates multiple website instances to a new template version

## Installation

First, install the CLI tools globally:

```bash
cd scripts
npm install -g .
```

This will make both `create-plumbing-site` and `update-plumbing-sites` commands available globally.

## Creating New Sites

To create a new website instance:

```bash
create-plumbing-site <site-name> [options]
```

Options:
- `-d, --dir <directory>`: Target directory for the new site (defaults to current directory)

Example:
```bash
create-plumbing-site golden-plumbing --dir ~/websites
```

This will:
1. Create a new directory `~/websites/golden-plumbing`
2. Copy the template files
3. Prompt for business details
4. Set up the project

## Updating Multiple Sites

To update multiple website instances to a new template version:

```bash
update-plumbing-sites <base-dir> <template-dir> [options]
```

Options:
- `-d, --dry-run`: Show what would be updated without making changes

Example:
```bash
update-plumbing-sites ~/websites ~/plumbing-template --dry-run
```

This will:
1. Find all plumbing website instances in the base directory
2. Show what would be updated (in dry-run mode)
3. Create backups of each site
4. Copy updated files from the template
5. Update dependencies and rebuild

The update process:
- Preserves client-specific files (siteConfig.ts, images, etc.)
- Creates backups before making changes
- Updates shared components and configuration
- Rebuilds each site after updating

## Development

To work on the CLI tools:

1. Install dependencies:
```bash
cd scripts
npm install
```

2. Build the tools:
```bash
npm run build
```

3. Run in development mode:
```bash
# For create-site tool
npm run dev

# For update-sites tool
npm run update
npm run update:dry-run  # Test updates without making changes
```

## Managing Multiple Website Instances

When managing multiple website instances, consider these best practices:

1. **Version Control**: Each website instance has its own git repository. Use branches for feature development and keep the main branch stable.

2. **Template Updates**: Use the `update-plumbing-sites` tool to update all websites:
   - Always run with `--dry-run` first to review changes
   - Test updates on a single site before updating all
   - Keep backups of all sites
   - Monitor for any issues after updates

3. **Common Updates**: For updates that need to be applied to all websites:
   - Create a new branch in each website repository
   - Use the update tool to apply template changes
   - Test the changes
   - Deploy updates systematically

4. **Backup**: The update tool creates backups automatically, but also:
   - Regularly backup all website instances
   - Keep backups of client-specific files
   - Document backup locations and procedures

5. **Monitoring**: Set up monitoring for all websites:
   - Error tracking (e.g., Sentry)
   - Performance monitoring
   - Uptime monitoring
   - Analytics

## Directory Structure

```
scripts/
├── create-site.ts      # Create new website instances
├── update-sites.ts     # Update multiple websites
├── package.json        # CLI tool dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT 