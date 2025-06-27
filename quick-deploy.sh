#!/bin/bash

# Quick Deployment Script for AllTools
# Use this when you just need to restart after git pull

set -e

echo "⚡ Quick Deployment - Restarting AllTools..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Pull latest changes
print_status "Pulling latest changes from git..."
git pull

# Install dependencies (if package.json changed)
print_status "Checking for dependency updates..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Build applications
print_status "Building applications..."
cd backend && npm run build && cd ..
cd frontend && npm run build && cd ..

# Restart PM2 processes
print_status "Restarting PM2 processes..."
pm2 restart all

print_success "Quick deployment completed!"
print_status "Applications restarted successfully" 