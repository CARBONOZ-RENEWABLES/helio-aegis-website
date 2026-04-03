#!/bin/bash

COMMIT_MSG="${1:-Update website}"

echo "🚀 Deploying Helio Aegis Website..."
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "$COMMIT_MSG"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Git push failed!"
    exit 1
fi

echo ""
echo "🔄 Deploying to server..."

# Deploy on server
ssh root@192.168.160.98 << 'EOF'
set -e
cd /var/www/helio-aegis-website
echo "📥 Pulling latest code..."
git pull origin main
echo "📦 Installing dependencies..."
npm install
echo "🔨 Building..."
npm run build
echo "♻️  Restarting PM2..."
pm2 restart helio-aegis
echo ""
echo "📊 Process status:"
pm2 list | grep helio-aegis
echo ""
echo "📝 Recent logs:"
pm2 logs helio-aegis --lines 15 --nostream
EOF

echo ""
echo "✅ Deployment complete!"
echo "🌐 Visit: https://helioaegis.com"
