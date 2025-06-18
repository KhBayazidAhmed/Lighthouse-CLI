#!/bin/bash

# Lighthouse CLI Installation Script

echo "🚀 Installing Lighthouse CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16.0.0 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if ! node -e "
const [major, minor, patch] = '$NODE_VERSION'.split('.').map(Number);
const [reqMajor, reqMinor, reqPatch] = '$REQUIRED_VERSION'.split('.').map(Number);
const isValid = major > reqMajor || (major === reqMajor && minor > reqMinor) || (major === reqMajor && minor === reqMinor && patch >= reqPatch);
process.exit(isValid ? 0 : 1);
" 2>/dev/null; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 16.0.0 or higher."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build the project"
    exit 1
fi

# Make the CLI executable
echo "🔧 Making CLI executable..."
chmod +x dist/index.js

# Link globally (optional)
echo "🔗 Would you like to install the CLI globally? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Installing globally..."
    npm link
    
    if [ $? -eq 0 ]; then
        echo "✅ Lighthouse CLI installed globally!"
        echo "You can now use 'lighthouse-cli' from anywhere."
    else
        echo "❌ Failed to install globally. You can still use 'node dist/index.js' to run the CLI."
    fi
else
    echo "✅ Build completed! Use 'node dist/index.js' to run the CLI."
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Quick start:"
echo "  lighthouse-cli audit https://example.com"
echo "  lighthouse-cli batch -f sample-urls.txt"
echo "  lighthouse-cli compare https://site1.com https://site2.com"
echo ""
echo "For more information, run: lighthouse-cli --help" 