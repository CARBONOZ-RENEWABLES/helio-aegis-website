#!/bin/bash

# Helio Aegis Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting Helio Aegis deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Create logs directory
mkdir -p logs

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    npm install -g pm2
fi

# Stop existing process if running
echo "🛑 Stopping existing process..."
pm2 stop helio-aegis 2>/dev/null || true
pm2 delete helio-aegis 2>/dev/null || true

# Start the application
echo "▶️  Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 startup script
echo "⚙️  Setting up PM2 startup..."
pm2 startup

echo "✅ Deployment complete!"
echo ""
echo "📊 Application status:"
pm2 status
echo ""
echo "📝 Useful commands:"
echo "  pm2 logs helio-aegis    - View logs"
echo "  pm2 restart helio-aegis - Restart app"
echo "  pm2 stop helio-aegis    - Stop app"
echo "  pm2 monit               - Monitor resources"
