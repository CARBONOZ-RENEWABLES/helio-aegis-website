# Helio Aegis - Deployment Guide

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Production Deployment**
```bash
vercel --prod
```

**Vercel Configuration** (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1", "lhr1"]
}
```

### Option 2: AWS (CloudFront + S3)

1. **Build Static Export**
```bash
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync .next/static s3://your-bucket/static
aws s3 sync .next/server s3://your-bucket/server
```

3. **Configure CloudFront**
- Origin: S3 bucket
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Compress Objects: Yes
- Cache Policy: CachingOptimized

### Option 3: Docker

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run**:
```bash
docker build -t helio-aegis .
docker run -p 3000:3000 helio-aegis
```

## 🔧 Environment Variables

Create `.env.local` for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://helioaegis.com
NEXT_PUBLIC_SITE_NAME=Helio Aegis

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token

# Maps (Optional)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Email Service (Optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
CONTACT_EMAIL=info@helioaegis.com
```

## 🌐 Domain Configuration

### DNS Records
```
Type    Name    Value                           TTL
A       @       76.76.21.21                     300
CNAME   www     helio-aegis.vercel.app          300
TXT     @       v=spf1 include:_spf.google.com  300
```

### SSL/TLS
- Vercel provides automatic SSL certificates
- For custom domains, ensure DNS is properly configured
- Enable HSTS in production

## ⚡ Performance Optimization

### Image Optimization
- All images use Next.js Image component
- Automatic WebP/AVIF conversion
- Lazy loading enabled by default

### Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Tree shaking enabled

### Caching Strategy
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 📊 Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

## 🔒 Security Headers

Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

## 🧪 Testing Before Deployment

```bash
# Lint check
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

## 📈 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Check Core Web Vitals (Lighthouse)
- [ ] Verify contact form submissions
- [ ] Test navigation on all devices
- [ ] Confirm analytics tracking
- [ ] Check SSL certificate
- [ ] Test page load speed
- [ ] Verify SEO meta tags
- [ ] Test social media previews

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
- Check image URLs are accessible
- Verify Next.js Image domains in next.config.js
- Ensure images are optimized (< 2MB)

### Slow Performance
- Enable compression in hosting
- Verify CDN is active
- Check bundle size: `npm run build -- --analyze`

## 📞 Support

For deployment issues:
- Email: tech@helioaegis.com
- Documentation: https://nextjs.org/docs

---

**Last Updated**: March 2025
