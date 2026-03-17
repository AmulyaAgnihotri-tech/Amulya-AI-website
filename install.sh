#!/bin/bash

# Installation script for AmulyaAI on macOS/Linux

echo ""
echo "================================================"
echo " AmulyaAI - Next.js SaaS Platform Setup"
echo "================================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
NODE_VERSION=$(node --version 2>/dev/null)

if [ -z "$NODE_VERSION" ]; then
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from https://nodejs.org"
    echo "Download LTS version (18.x or higher)"
    echo ""
    exit 1
else
    echo "  ✓ Node.js $NODE_VERSION installed"
fi

# Check npm
echo "Checking npm installation..."
NPM_VERSION=$(npm --version 2>/dev/null)

if [ -z "$NPM_VERSION" ]; then
    echo "ERROR: npm is not installed!"
    exit 1
else
    echo "  ✓ npm $NPM_VERSION installed"
fi

echo ""
echo "================================================"
echo " Installing dependencies..."
echo "================================================"
echo ""

# Install dependencies
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi

echo ""
echo "================================================"
echo " Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Create .env.local file (copy from .env.example)"
echo "  2. Add your API keys to .env.local:"
echo "     - Supabase URL and API key"
echo "     - Stripe API keys"
echo "     - OpenAI API key"
echo "  3. Run: npm run dev"
echo "  4. Open http://localhost:3000"
echo ""
echo "For detailed setup instructions, see SETUP_GUIDE.md"
echo ""
