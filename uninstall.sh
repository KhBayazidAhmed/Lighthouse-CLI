#!/bin/bash

# Lighthouse CLI Uninstall Script

echo "🗑️  Uninstalling Lighthouse CLI..."

# Check if CLI is globally installed
if command -v lighthouse-cli &> /dev/null; then
    echo "📦 Removing global CLI installation..."
    npm unlink lighthouse-cli
    
    if [ $? -eq 0 ]; then
        echo "✅ Global CLI removed successfully!"
    else
        echo "⚠️  Failed to remove global CLI. You may need to run with sudo or check npm permissions."
    fi
else
    echo "ℹ️  Global CLI not found, skipping global removal."
fi

# Clean build files
echo "🧹 Cleaning build files..."
npm run clean

if [ $? -eq 0 ]; then
    echo "✅ Build files cleaned!"
else
    echo "⚠️  Failed to clean build files. Trying manual cleanup..."
    rm -rf dist
    echo "✅ Manual cleanup completed!"
fi

# Ask about node_modules
echo ""
echo "🤔 Would you like to remove node_modules and package-lock.json? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🗂️  Removing node_modules and package-lock.json..."
    rm -rf node_modules
    rm -f package-lock.json
    echo "✅ Dependencies removed!"
else
    echo "ℹ️  Keeping node_modules and package-lock.json"
fi

# Ask about lighthouse reports
echo ""
echo "📊 Would you like to remove generated lighthouse reports? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "📋 Removing lighthouse reports..."
    rm -rf lighthouse-reports
    echo "✅ Reports removed!"
else
    echo "ℹ️  Keeping lighthouse reports"
fi

echo ""
echo "🎉 Uninstall complete!"
echo ""
echo "To reinstall, run: bash install.sh" 