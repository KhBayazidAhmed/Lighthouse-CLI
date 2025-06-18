# Lighthouse CLI - Automated Performance Auditing

A powerful command-line tool for automating Google Lighthouse audits, built with TypeScript and Node.js.

## Features

- 🚀 **Single URL Audits** - Run Lighthouse audits on individual websites
- 📊 **Batch Processing** - Audit multiple URLs from a file or command line
- 🔍 **URL Comparison** - Compare performance metrics between two websites
- 📈 **Continuous Monitoring** - Monitor websites and get alerts on performance degradation
- 📋 **Multiple Output Formats** - Export reports as HTML, JSON, or CSV
- 🖥️ **Device Emulation** - Test on mobile or desktop configurations
- ⚡ **Concurrent Processing** - Run multiple audits simultaneously for faster batch processing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd light-house-cli
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link the CLI globally (optional):
```bash
npm link
```

## Usage

### Single URL Audit

Run a Lighthouse audit on a single URL:

```bash
# Basic audit
lighthouse-cli audit https://example.com

# Custom output filename and format
lighthouse-cli audit https://example.com -o my-report -f json

# Desktop audit with specific categories
lighthouse-cli audit https://example.com -d desktop -c performance,accessibility

# Disable throttling for faster local testing
lighthouse-cli audit https://example.com --no-throttling
```

**Options:**
- `-o, --output <filename>` - Output filename (without extension)
- `-f, --format <format>` - Output format: `json`, `html`, `csv` (default: `html`)
- `-d, --device <device>` - Device type: `mobile`, `desktop` (default: `mobile`)
- `-c, --categories <categories>` - Comma-separated categories: `performance,accessibility,best-practices,seo,pwa`
- `--output-dir <dir>` - Output directory (default: `./lighthouse-reports`)
- `--no-throttling` - Disable network/CPU throttling

### Batch Audits

Audit multiple URLs at once:

```bash
# From a file
lighthouse-cli batch -f sample-urls.txt

# From command line
lighthouse-cli batch -u "https://example.com,https://google.com,https://github.com"

# With custom settings
lighthouse-cli batch -f urls.txt --format json --concurrent 5 --device desktop
```

**Options:**
- `-f, --file <file>` - File containing URLs (one per line)
- `-u, --urls <urls>` - Comma-separated URLs
- `-o, --output <prefix>` - Output filename prefix
- `--concurrent <number>` - Number of concurrent audits (default: 3)
- All single audit options are also available

### URL Comparison

Compare performance metrics between two URLs:

```bash
lighthouse-cli compare https://example.com https://competitor.com

# With specific device and categories
lighthouse-cli compare https://site-a.com https://site-b.com -d desktop -c performance,seo
```

### Continuous Monitoring

Monitor a website continuously and get alerts when performance drops:

```bash
# Monitor every hour with performance threshold of 80
lighthouse-cli monitor https://example.com -i 60 -t 80

# Monitor every 30 minutes with threshold of 90
lighthouse-cli monitor https://example.com -i 30 -t 90
```

**Options:**
- `-i, --interval <minutes>` - Monitoring interval in minutes (default: 60)
- `-t, --threshold <score>` - Performance score threshold 0-100 (default: 80)

## File Formats

### URLs File Format

Create a text file with one URL per line. Lines starting with `#` are treated as comments:

```
# Production sites
https://example.com
https://api.example.com

# Staging sites
https://staging.example.com

# Competitor analysis
https://competitor1.com
https://competitor2.com
```

### Output Formats

- **HTML** - Full interactive Lighthouse report (default)
- **JSON** - Raw Lighthouse data for programmatic use
- **CSV** - Spreadsheet-friendly format with key metrics

## Examples

### Basic Website Audit
```bash
lighthouse-cli audit https://example.com
```

### Comprehensive E-commerce Analysis
```bash
lighthouse-cli batch -f ecommerce-sites.txt -d desktop -c performance,accessibility,best-practices,seo --format json --concurrent 3
```

### Mobile Performance Comparison
```bash
lighthouse-cli compare https://old-site.com https://new-site.com -d mobile -c performance
```

### Production Monitoring
```bash
lighthouse-cli monitor https://production-site.com -i 30 -t 85
```

## Output Structure

Reports are saved to `./lighthouse-reports/` by default with the following naming convention:
- Single audits: `{hostname}-{timestamp}.{format}`
- Batch audits: Individual reports + `batch-summary-{timestamp}.json`

## Requirements

- Node.js 16.0.0 or higher
- Chrome/Chromium browser (automatically launched)

## Development

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Watch for changes
npm run watch

# Clean build directory
npm run clean
```

## Troubleshooting

### Chrome Launch Issues
If you encounter Chrome launch issues, ensure you have Chrome or Chromium installed and accessible in your PATH.

### Memory Issues
For large batch audits, consider reducing the `--concurrent` option to avoid memory issues.

### Network Issues
Use `--no-throttling` for local development or when testing on fast networks.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see LICENSE file for details. 