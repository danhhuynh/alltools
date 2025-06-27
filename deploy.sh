#!/bin/bash

# AllTools Production Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

echo "🚀 Starting AllTools Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 is not installed. Installing PM2..."
    npm install -g pm2
    print_success "PM2 installed successfully"
fi

# Check if serve is installed globally
if ! command -v serve &> /dev/null; then
    print_warning "serve package not found. Installing serve..."
    npm install -g serve
    print_success "serve installed successfully"
fi

# Create logs directory if it doesn't exist
print_status "Creating logs directory..."
mkdir -p logs

# Stop existing PM2 processes
print_status "Stopping existing PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Install dependencies
print_status "Installing root dependencies..."
npm install

print_status "Installing backend dependencies..."
cd backend
npm install
cd ..

print_status "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build applications
print_status "Building backend..."
cd backend
npm run build
cd ..

print_status "Building frontend..."
cd frontend
npm run build
cd ..

# Create production data directory for nicknames
print_status "Setting up production data directory..."
mkdir -p backend/data

# Check if production nickname file exists, if not create it
if [ ! -f "backend/data/user-nicknames-production.json" ]; then
    print_status "Creating production nickname file..."
    cat > backend/data/user-nicknames-production.json << 'EOF'
{
  "nicknames": [
    "rabbit", "bunny", "cat", "dog", "fox", "wolf", "bear", "deer", "squirrel", "owl",
    "eagle", "hawk", "penguin", "dolphin", "whale", "shark", "tiger", "lion", "elephant", "giraffe",
    "zebra", "panda", "koala", "kangaroo", "platypus", "emu", "ostrich", "flamingo", "peacock", "swan",
    "duck", "goose", "turkey", "chicken", "rooster", "cow", "horse", "sheep", "goat", "pig",
    "hamster", "guinea_pig", "ferret", "chinchilla", "hedgehog", "sloth", "anteater", "armadillo", "capybara", "beaver"
  ],
  "user_mappings": {}
}
EOF
    print_success "Production nickname file created"
fi

# Set environment variables
export NODE_ENV=production

# Start applications with PM2
print_status "Starting applications with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup

print_success "Deployment completed successfully!"
print_status "Applications are now running:"
echo "  - Frontend: http://localhost:5000"
echo "  - Backend: http://localhost:3000"
echo ""
print_status "PM2 Commands:"
echo "  - View logs: pm2 logs"
echo "  - Monitor: pm2 monit"
echo "  - Restart: pm2 restart all"
echo "  - Stop: pm2 stop all"
echo "  - Status: pm2 status" 