#!/bin/bash

# NoteSong AI Quick Start Script
# This script helps set up the development environment

echo "🎵 Welcome to NoteSong AI Setup 🎵"
echo "===================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js is installed: $NODE_VERSION"
else
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo ""
echo "Checking npm installation..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm --version)
    echo "✅ npm is installed: $NPM_VERSION"
else
    echo "❌ npm is not installed"
    exit 1
fi

# Install Expo CLI globally if not installed
echo ""
echo "Checking Expo CLI installation..."
if command -v expo &> /dev/null
then
    EXPO_VERSION=$(expo --version)
    echo "✅ Expo CLI is installed: $EXPO_VERSION"
else
    echo "⚠️  Expo CLI is not installed"
    read -p "Would you like to install Expo CLI globally? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo "Installing Expo CLI..."
        npm install -g expo-cli
        echo "✅ Expo CLI installed successfully"
    else
        echo "Skipping Expo CLI installation"
    fi
fi

# Install project dependencies
echo ""
echo "Installing project dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file for API keys..."
    cat > .env << 'EOF'
# OpenAI API Key (for lyrics generation)
OPENAI_API_KEY=your_openai_api_key_here

# Google Cloud API Key (for image analysis)
GOOGLE_CLOUD_API_KEY=your_google_cloud_key_here

# Backend API URL
BACKEND_API_URL=http://localhost:3000

# Add other API keys as needed
EOF
    echo "✅ .env file created. Please add your API keys."
else
    echo ""
    echo "ℹ️  .env file already exists"
fi

# Success message
echo ""
echo "===================================="
echo "✅ Setup Complete! ✅"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Add your API keys to the .env file (for production features)"
echo "2. Run 'npm start' to start the development server"
echo "3. Scan the QR code with Expo Go app on your phone"
echo "   Or press 'i' for iOS simulator, 'a' for Android emulator"
echo ""
echo "For detailed instructions, see GETTING_STARTED.md"
echo ""
echo "Happy coding! 🎵📚"
