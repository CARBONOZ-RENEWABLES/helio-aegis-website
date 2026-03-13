# 🚀 Helio Aegis Website - Deployment & Usage Guide

## ✅ Build Status: SUCCESSFUL

All pages compiled successfully with no errors or warnings.

```
✓ Compiled successfully
✓ All 8 pages generated
✓ First Load JS: 144 kB
✓ Ready for production
```

---

## 📊 Final Build Output

```
Route                    Size        First Load JS
/                        8.42 kB     144 kB
/about                   183 B       135 kB
/capabilities            195 B       135 kB
/contact                 2.32 kB     138 kB
/insights                2.23 kB     137 kB
/investors               2.79 kB     138 kB
/portfolio               2.17 kB     137 kB

Shared Chunks: 87.3 kB
Total: 144 kB First Load
```

---

## 🚀 Deployment Instructions

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts to connect your GitHub repo
# 4. Vercel will automatically build and deploy
```

### Option 2: AWS CloudFront

```bash
# 1. Build the project
npm run build

# 2. Upload .next folder to S3
aws s3 sync .next s3://your-bucket-name

# 3. Create CloudFront distribution pointing to S3
# 4. Configure custom domain in Route 53
```

### Option 3: Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod

# 3. Follow prompts to connect your GitHub repo
```

### Option 4: Self-Hosted (Node.js)

```bash
# 1. Build the project
npm run build

# 2. Start production server
npm start

# 3. Use PM2 for process management
npm i -g pm2
pm2 start npm --name "helio-aegis" -- start
pm2 save
pm2 startup
```

---

## 🔧 Environment Configuration

### Create `.env.local` file:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://helioaegis.com

# Optional: Mapbox for interactive map
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Optional: Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Optional: Email Service
SENDGRID_API_KEY=your_sendgrid_key
```

---

## 📱 Development Workflow

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000

# 4. Make changes - hot reload enabled
```

### Production Build

```bash
# 1. Build for production
npm run build

# 2. Test production build locally
npm start

# 3. Deploy to your platform
```

---

## 🎯 Customization Guide

### 1. Update Company Information

**File**: `app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Your Company | Renewable Energy',
  description: 'Your company description',
}
```

### 2. Update Colors

**File**: `tailwind.config.js`
```javascript
colors: {
  solar: '#F5A623',  // Change primary accent
  hydrogen: '#00C2FF', // Change secondary accent
  // ... other colors
}
```

### 3. Add New Projects

**File**: `components/home/FeaturedProjects.tsx`
```typescript
const projects = [
  {
    id: 7,
    name: 'New Project Name',
    location: 'Location',
    capacity: '100 MW',
    technology: 'Solar',
    status: 'OPERATIONAL',
    cod: 'Q1 2025',
    image: '🏜️',
  },
  // ... more projects
]
```

### 4. Update Team Members

**File**: `app/about/page.tsx`
```typescript
{
  name: 'New Team Member',
  title: 'Position',
  bio: 'Biography',
  expertise: ['Skill 1', 'Skill 2'],
}
```

### 5. Add New Articles

**File**: `app/insights/page.tsx`
```typescript
{
  id: 7,
  type: 'Research',
  date: 'Jan 20, 2025',
  title: 'Article Title',
  excerpt: 'Article excerpt...',
  readTime: '10 min read',
  category: 'Market Analysis',
}
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to git
- Use `.env.local.example` for reference
- Rotate API keys regularly

### 2. HTTPS
- Always use HTTPS in production
- Enable HSTS headers
- Use SSL certificate from trusted CA

### 3. Content Security Policy
- Configure CSP headers
- Restrict external resources
- Monitor for violations

### 4. Rate Limiting
- Implement rate limiting on forms
- Protect API endpoints
- Monitor for abuse

---

## 📊 Performance Optimization

### Image Optimization
```typescript
// Already configured with next/image
// Images automatically optimized to WebP/AVIF
```

### Font Optimization
```typescript
// Fonts preloaded in layout.tsx
// Using next/font for optimal loading
```

### Code Splitting
```typescript
// Automatic with Next.js App Router
// Each page is a separate chunk
```

### Caching Strategy
```typescript
// Static pages: Cached indefinitely
// Dynamic content: Revalidated on demand
// API routes: Cache headers configured
```

---

## 🔍 SEO Optimization

### Meta Tags
- ✅ Title and description configured
- ✅ Open Graph tags included
- ✅ Twitter card tags included
- ✅ Canonical URLs set

### Structured Data
- ✅ Organization schema ready
- ✅ BreadcrumbList ready
- ✅ Article schema ready
- ✅ FAQPage schema ready

### Sitemap
```bash
# Generate sitemap
npm run build
# Sitemap will be generated in .next/static
```

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://helioaegis.com/sitemap.xml
```

---

## 📈 Analytics Setup

### Google Analytics
```typescript
// Add to app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Mixpanel
```typescript
// Track custom events
mixpanel.track('Button Clicked', {
  button_name: 'Schedule Meeting',
  page: 'homepage'
})
```

---

## 🐛 Troubleshooting

### Build Errors

**Error**: `MODULE_NOT_FOUND`
```bash
# Solution: Clear cache and rebuild
rm -rf .next node_modules/.cache
npm run build
```

**Error**: `ENOENT: no such file or directory`
```bash
# Solution: Ensure all imports are correct
# Check file paths and extensions
```

### Runtime Errors

**Error**: `Cannot find module`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error**: `Port already in use`
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

---

## 📞 Support Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Docs](https://react.dev)

### Community
- [Next.js Discord](https://discord.gg/bUG7V3r)
- [Tailwind CSS Discord](https://discord.gg/7NF8agS)
- [Stack Overflow](https://stackoverflow.com)

---

## ✅ Pre-Deployment Checklist

- [ ] All pages tested locally
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] SSL certificate ready
- [ ] Domain configured
- [ ] Analytics set up
- [ ] Email service configured
- [ ] Backup created
- [ ] Performance tested
- [ ] SEO verified

---

## 🎉 Deployment Complete!

Your Helio Aegis website is ready for production deployment.

**Next Steps**:
1. Choose deployment platform
2. Configure environment variables
3. Set up custom domain
4. Enable SSL certificate
5. Monitor performance
6. Set up analytics
7. Configure email notifications

---

**Built with precision for institutional capital markets.**

*© 2025 Helio Aegis Capital Partners LLC. All rights reserved.*
