# 🚀 Lighthouse CLI - Automated Performance Auditing Tool

A powerful, TypeScript-based command-line tool for automating Google Lighthouse audits with advanced features like batch processing, URL comparison, and continuous monitoring.

## ✨ Features

- 🔍 **Single URL Audits** - Run comprehensive Lighthouse audits on individual websites
- 📊 **Batch Processing** - Audit multiple URLs simultaneously with configurable concurrency
- ⚖️ **URL Comparison** - Side-by-side performance comparison between two websites
- 📈 **Continuous Monitoring** - Automated monitoring with performance threshold alerts
- 📋 **Multiple Output Formats** - Export as HTML, JSON, or CSV formats
- 📱 **Device Emulation** - Test on mobile or desktop configurations
- ⚡ **Concurrent Processing** - Multi-threaded audits for faster batch processing
- 🎯 **Category Selection** - Choose specific audit categories (Performance, Accessibility, SEO, etc.)
- 🚫 **Throttling Control** - Disable throttling for local development testing

## 📋 Requirements

- **Node.js**: 16.0.0 or higher
- **Chrome/Chromium**: Automatically launched (must be installed)
- **Operating System**: macOS, Linux, or Windows

## 🔧 Installation

### Quick Install (Recommended)

```bash
# Clone the repository
git clone https://github.com/KhBayazidAhmed/Lighthouse-CLI
cd light-house-cli

# Run the installation script
chmod +x install.sh
./install.sh
```

The installation script will:
- ✅ Check Node.js version compatibility
- 📦 Install all dependencies
- 🔨 Build the project
- 🔗 Optionally install globally for system-wide access

### Manual Installation

```bash
# 1. Clone and navigate
git clone https://github.com/KhBayazidAhmed/Lighthouse-CLI
cd light-house-cli

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. (Optional) Install globally
npm link
```

## 🚀 Usage Guide

### Command Structure

```bash
# If installed globally
lighthouse-cli <command> [options]

# If not installed globally
node dist/index.js <command> [options]
```

---

## 📖 Commands Reference

### 1. Single URL Audit

Perform a comprehensive Lighthouse audit on a single website.

```bash
# Basic audit (mobile, HTML output)
lighthouse-cli audit https://example.com

# Custom filename and JSON output
lighthouse-cli audit https://example.com -o my-website-audit -f json

# Desktop audit with specific categories
lighthouse-cli audit https://example.com -d desktop -c performance,accessibility,seo

# Fast audit without throttling (for local development)
lighthouse-cli audit http://localhost:3000 --no-throttling
```

#### Options:
| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-o, --output` | Output filename (without extension) | Auto-generated | `-o my-report` |
| `-f, --format` | Output format: `html`, `json`, `csv` | `html` | `-f json` |
| `-d, --device` | Device type: `mobile`, `desktop` | `mobile` | `-d desktop` |
| `-c, --categories` | Audit categories (comma-separated) | `performance,accessibility,best-practices,seo` | `-c performance,seo` |
| `--output-dir` | Output directory | `./lighthouse-reports` | `--output-dir ./reports` |
| `--no-throttling` | Disable network/CPU throttling | false | `--no-throttling` |

#### Available Categories:
- `performance` - Core Web Vitals, loading performance
- `accessibility` - WCAG compliance, screen reader compatibility
- `best-practices` - Security, modern web standards
- `seo` - Search engine optimization
- `pwa` - Progressive Web App features

---

### 2. Batch Audits

Audit multiple URLs efficiently with concurrent processing.

```bash
# Audit URLs from a file
lighthouse-cli batch -f sample-urls.txt

# Audit specific URLs from command line
lighthouse-cli batch -u "https://example.com,https://google.com,https://github.com"

# Advanced batch audit with custom settings
lighthouse-cli batch -f urls.txt --format json --concurrent 5 --device desktop -o batch-report
```

#### Options:
| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-f, --file` | File containing URLs (one per line) | - | `-f my-urls.txt` |
| `-u, --urls` | Comma-separated URLs | - | `-u "site1.com,site2.com"` |
| `-o, --output` | Output filename prefix | Auto-generated | `-o batch-audit` |
| `--concurrent` | Number of concurrent audits | `3` | `--concurrent 5` |

*All single audit options are also available for batch processing.*

#### URL File Format:
```
# Comments start with #
# One URL per line

# Production sites
https://www.example.com
https://api.example.com

# Staging environments
https://staging.example.com

# Competitor analysis
https://competitor1.com
https://competitor2.com
```

---

### 3. URL Comparison

Compare performance metrics between two websites side-by-side.

```bash
# Basic comparison
lighthouse-cli compare https://example.com https://competitor.com

# Desktop comparison with specific categories
lighthouse-cli compare https://old-site.com https://new-site.com -d desktop -c performance,seo

# Compare staging vs production
lighthouse-cli compare https://staging.mysite.com https://mysite.com
```

#### Options:
| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-d, --device` | Device type: `mobile`, `desktop` | `mobile` | `-d desktop` |
| `-c, --categories` | Audit categories (comma-separated) | `performance,accessibility,best-practices,seo` | `-c performance,seo` |
| `--output-dir` | Output directory | `./lighthouse-reports` | `--output-dir ./comparisons` |

---

### 4. Continuous Monitoring

Monitor websites continuously and receive alerts when performance degrades.

```bash
# Monitor every hour with 80% performance threshold
lighthouse-cli monitor https://example.com -i 60 -t 80

# Frequent monitoring (every 15 minutes) with high threshold
lighthouse-cli monitor https://critical-app.com -i 15 -t 90

# Monitor with custom output directory
lighthouse-cli monitor https://example.com --output-dir ./monitoring-reports
```

#### Options:
| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-i, --interval` | Monitoring interval in minutes | `60` | `-i 30` |
| `-t, --threshold` | Performance score threshold (0-100) | `80` | `-t 90` |
| `--output-dir` | Output directory | `./lighthouse-reports` | `--output-dir ./monitoring` |

---

## 📁 Output Structure

Reports are organized in the following structure:

```
lighthouse-reports/
├── single-audits/
│   ├── example-com-2024-01-15-14-30-25.html
│   └── github-com-2024-01-15-14-31-10.json
├── batch-audits/
│   ├── batch-summary-2024-01-15-15-00-00.json
│   ├── example-com-2024-01-15-15-00-15.html
│   └── google-com-2024-01-15-15-00-30.html
├── comparisons/
│   └── comparison-2024-01-15-16-00-00.json
└── monitoring/
    ├── example-com-monitor-2024-01-15-17-00-00.html
    └── monitoring-log.json
```

### Naming Convention:
- **Single audits**: `{hostname}-{timestamp}.{format}`
- **Batch audits**: Individual reports + `batch-summary-{timestamp}.json`
- **Comparisons**: `comparison-{timestamp}.json`
- **Monitoring**: `{hostname}-monitor-{timestamp}.{format}`

---

## 💡 Usage Examples

### 🏢 Enterprise Website Audit
```bash
# Comprehensive audit for production site
lighthouse-cli audit https://company.com -d desktop -c performance,accessibility,best-practices,seo -f json -o production-audit
```

### 🛒 E-commerce Performance Analysis
```bash
# Batch audit of e-commerce pages
lighthouse-cli batch -f ecommerce-pages.txt --format json --concurrent 4 --device mobile -o ecommerce-analysis
```

### 🔄 Before/After Deployment Comparison
```bash
# Compare old vs new version
lighthouse-cli compare https://old.mysite.com https://new.mysite.com -d desktop -c performance
```

### 📊 Continuous Production Monitoring
```bash
# Monitor critical application every 30 minutes
lighthouse-cli monitor https://app.company.com -i 30 -t 85
```

### 🚀 Local Development Testing
```bash
# Test local development server without throttling
lighthouse-cli audit http://localhost:3000 --no-throttling -d desktop
```

### 📱 Mobile-First Performance Audit
```bash
# Mobile-focused audit with Core Web Vitals
lighthouse-cli audit https://mobile-site.com -d mobile -c performance -f json
```

---

## 🛠️ Development

### Development Commands

```bash
# Run in development mode with hot reload
npm run dev

# Build the project
npm run build

# Watch for changes during development
npm run watch

# Clean build directory
npm run clean

# Run tests (when implemented)
npm test
```

### Project Structure

```
light-house-cli/
├── src/
│   ├── commands/          # CLI command definitions
│   ├── services/          # Core business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── constants/        # Configuration constants
│   └── index.ts          # Main entry point
├── lighthouse-reports/   # Default output directory
├── install.sh           # Installation script
├── sample-urls.txt      # Example URLs file
└── package.json         # Project configuration
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 🚫 Chrome Launch Issues
**Problem**: "Chrome failed to launch" or similar errors

**Solutions**:
```bash
# Install Chrome/Chromium if missing
# macOS
brew install --cask google-chrome

# Ubuntu/Debian
sudo apt-get install google-chrome-stable

# CentOS/RHEL
sudo yum install google-chrome-stable
```

#### 💾 Memory Issues During Batch Audits
**Problem**: Out of memory errors during large batch processing

**Solutions**:
```bash
# Reduce concurrent audits
lighthouse-cli batch -f urls.txt --concurrent 2

# Process in smaller batches
split -l 10 large-urls.txt batch-
lighthouse-cli batch -f batch-aa
lighthouse-cli batch -f batch-ab
```

#### 🌐 Network Connectivity Issues
**Problem**: Timeouts or network-related failures

**Solutions**:
```bash
# Disable throttling for local networks
lighthouse-cli audit https://example.com --no-throttling

# Use desktop mode for better performance
lighthouse-cli audit https://example.com -d desktop
```

#### 📁 Permission Issues
**Problem**: Cannot write to output directory

**Solutions**:
```bash
# Create output directory with proper permissions
mkdir -p ./lighthouse-reports
chmod 755 ./lighthouse-reports

# Use custom output directory
lighthouse-cli audit https://example.com --output-dir ~/Documents/reports
```

#### 🔧 Node.js Version Issues
**Problem**: Incompatible Node.js version

**Solutions**:
```bash
# Check current version
node --version

# Install/update Node.js (using nvm)
nvm install 16
nvm use 16

# Or install latest LTS
nvm install --lts
nvm use --lts
```

### Performance Tips

1. **Optimize Concurrent Audits**: Start with `--concurrent 3` and adjust based on your system's performance
2. **Use Appropriate Device Settings**: Desktop audits are generally faster than mobile
3. **Select Specific Categories**: Use `-c performance` for faster audits when you only need performance metrics
4. **Local Development**: Always use `--no-throttling` for local testing
5. **Large Batch Processing**: Split large URL lists into smaller batches for better reliability

---

## 📊 Understanding Lighthouse Scores

### Score Ranges:
- 🟢 **90-100**: Good
- 🟡 **50-89**: Needs Improvement  
- 🔴 **0-49**: Poor

### Key Metrics:
- **Performance**: Core Web Vitals, loading speed, interactivity
- **Accessibility**: Screen reader compatibility, color contrast, keyboard navigation
- **Best Practices**: Security, modern web standards, browser compatibility
- **SEO**: Search engine optimization, meta tags, structured data
- **PWA**: Progressive Web App features, offline functionality, installability

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [examples](#-usage-examples) for similar use cases
3. Create an issue in the GitHub repository
4. Include your system information, command used, and error messages

---

## 🎯 Quick Reference

```bash
# Quick start commands
lighthouse-cli audit https://example.com                    # Basic audit
lighthouse-cli batch -f sample-urls.txt                     # Batch from file
lighthouse-cli compare https://site1.com https://site2.com  # Compare sites
lighthouse-cli monitor https://example.com -i 30 -t 85      # Monitor site

# Common options
-d desktop          # Desktop device
-f json            # JSON output
--no-throttling    # Disable throttling
-c performance     # Performance only
--concurrent 5     # 5 concurrent audits
```

Happy auditing! 🚀 
