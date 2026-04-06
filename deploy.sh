#!/bin/bash

SERVER_IP="192.168.160.98"
DOMAIN="helioaegis.com"
PROJECT_DIR="/var/www/helio-aegis-website"
PORT=3001

echo "🚀 Deploying Helio Aegis Website..."

# Copy Nginx config
echo "📝 Copying Nginx configuration..."
scp nginx-ssl.conf root@$SERVER_IP:/etc/nginx/sites-available/helioaegis

# SSH and setup
ssh root@$SERVER_IP << 'ENDSSH'
# Enable site
ln -sf /etc/nginx/sites-available/helioaegis /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t && systemctl reload nginx

# Create project directory
mkdir -p /var/www/helio-aegis-website
cd /var/www/helio-aegis-website

# Clone or pull repository
if [ -d ".git" ]; then
    git pull
else
    git clone YOUR_GITHUB_REPO_URL .
fi

# Install dependencies
npm install

# Build Next.js app
npm run build

# Setup PM2
pm2 delete helio-aegis 2>/dev/null || true
pm2 start npm --name "helio-aegis" -- start -- -p 3001

pm2 save
pm2 startup

echo "✅ Helio Aegis website deployed successfully!"
ENDSSH

echo "✅ Deployment complete!"
echo "⚠️  Don't forget to:"
echo "   1. Update YOUR_GITHUB_REPO_URL in this script"
echo "   2. Generate SSL certificates: certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN"
echo "   3. Configure DNS A records to point to $SERVER_IP"
