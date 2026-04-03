#!/bin/bash

# Configuration
GITHUB_REPO="CARBONOZ-RENEWABLES/helio-aegis-website"
SERVER_IP="192.168.160.98"
DOMAIN="helioaegis.com"

echo "🚀 Deploying Helio Aegis from GitHub..."

# Upload Nginx config
scp nginx-ssl.conf root@$SERVER_IP:/etc/nginx/sites-available/helioaegis

# Deploy on server
ssh root@$SERVER_IP << ENDSSH
set -e

# Setup Nginx
ln -sf /etc/nginx/sites-available/helioaegis /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Clone/Update repository
if [ ! -d "/var/www/helio-aegis-website" ]; then
    cd /var/www
    git clone https://github.com/$GITHUB_REPO.git helio-aegis-website
fi

cd /var/www/helio-aegis-website
git pull origin main

# Build
npm install
npm run build

# PM2
pm2 delete helio-aegis 2>/dev/null || true
pm2 start npm --name "helio-aegis" -- start -- -p 3001
pm2 save

echo "✅ Deployed successfully!"
ENDSSH

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Update GITHUB_REPO in this script"
echo "2. Generate SSL: ssh root@$SERVER_IP 'certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN'"
echo "3. Point DNS A records to $SERVER_IP"
