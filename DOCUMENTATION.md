# Helio Aegis Website - Complete Documentation

## 📋 Project Overview

A world-class corporate website for Helio Aegis, positioning the company at the institutional tier alongside Ørsted, NextEra Energy, and Brookfield Renewable. Built as the primary capital-raising and partnership acquisition tool.

### Target Audience
- Institutional investors (pension funds, sovereign wealth funds, family offices)
- Project developers seeking capital or EPC management
- Government infrastructure agencies
- C-suite executives at energy companies

### Design Philosophy
Bloomberg Terminal crossed with an architectural firm's portfolio — data-rich, visually commanding, instilling absolute confidence.

## 🎨 Design System

### Brand Voice
**Authoritative. Precise. Global.**
- Understated confidence — never boastful, always credible
- Numbers speak. Results lead
- Every word earns its place

### Color System
```css
Primary Palette:
--color-void:         #080C14   /* Deep space navy background */
--color-obsidian:     #0D1421   /* Card backgrounds */
--color-slate-dark:   #141D2E   /* Elevated surfaces */
--color-slate-mid:    #1E2C42   /* Borders, dividers */
--color-slate-light:  #2A3F5E   /* Hover states */

Accent System:
--color-solar:        #F5A623   /* Primary CTA, luminous amber */
--color-solar-dim:    #C4841C   /* Hover state */
--color-hydrogen:     #00C2FF   /* Secondary accent, clean energy blue */
--color-growth:       #22C55E   /* Positive metrics */
--color-alert:        #EF4444   /* Warnings */

Typography Colors:
--color-text-primary:   #F0F4F8   /* Headlines */
--color-text-secondary: #8DA0B8   /* Body, subheads */
--color-text-muted:     #4A6080   /* Captions, labels */
```

### Typography Scale
```css
Font Stack:
--font-display:  Playfair Display (editorial luxury)
--font-body:     DM Sans (clean, modern)
--font-mono:     JetBrains Mono (metrics, data)

Type Scale (Major Third — 1.25 ratio):
--text-xs:    0.64rem   /* 10.24px — labels */
--text-sm:    0.8rem    /* 12.8px  — metadata */
--text-base:  1rem      /* 16px    — body */
--text-md:    1.25rem   /* 20px    — lead */
--text-lg:    1.563rem  /* 25px    — section intros */
--text-xl:    1.953rem  /* 31px    — card titles */
--text-2xl:   2.441rem  /* 39px    — section headings */
--text-3xl:   3.052rem  /* 49px    — page titles */
--text-4xl:   3.815rem  /* 61px    — hero headings */
--text-5xl:   4.768rem  /* 76px    — hero display */
--text-hero:  6.103rem  /* 98px    — full-bleed hero */
```

### Spacing System
Based on 4px grid:
- Base unit: 4px
- Section padding: clamp(5rem, 10vw, 10rem)
- Content max-width: 1440px
- Prose max-width: 720px

### Responsive Breakpoints
```css
--bp-sm:   640px   /* Mobile landscape */
--bp-md:   768px   /* Tablet */
--bp-lg:   1024px  /* Laptop */
--bp-xl:   1280px  /* Desktop */
--bp-2xl:  1536px  /* Large desktop */
```

## 🏗️ Architecture

### File Structure
```
helio-aegis-website/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── capabilities/
│   ├── contact/
│   │   └── page.tsx
│   ├── insights/
│   ├── investors/
│   ├── portfolio/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (Homepage)
├── components/
│   ├── home/
│   │   ├── Capabilities.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Hero.tsx
│   │   ├── InsightsTeaser.tsx
│   │   ├── InvestmentThesis.tsx
│   │   ├── MarketTicker.tsx
│   │   ├── PartnersCredentials.tsx
│   │   ├── PortfolioImpact.tsx
│   │   └── ProjectMap.tsx
│   ├── shared/
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── ui/
├── public/
│   └── (images, fonts, static assets)
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

### Component Hierarchy

**Homepage Flow:**
1. Navigation (sticky)
2. Hero (full viewport, animated globe)
3. MarketTicker (scrolling data strip)
4. Capabilities (2-col grid)
5. PortfolioImpact (animated metrics)
6. FeaturedProjects (card carousel)
7. ProjectMap (interactive global map)
8. InvestmentThesis (tabbed content)
9. InsightsTeaser (article grid)
10. PartnersCredentials (logo strip)
11. CTASection (meeting request)
12. Footer (comprehensive)

## 🎬 Animation System

### Motion Principles
1. **Purposeful** — every animation has a functional reason
2. **Institutional** — smooth, controlled, never playful
3. **Performance-first** — GPU-accelerated properties only
4. **Accessible** — respects prefers-reduced-motion

### Easing Curves
```css
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out:     cubic-bezier(0.83, 0, 0.17, 1)
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Animation Durations
```css
--duration-instant: 100ms   /* Button press */
--duration-fast:    200ms   /* Hover states */
--duration-normal:  350ms   /* Content transitions */
--duration-slow:    600ms   /* Section reveals */
--duration-xslow:   1200ms  /* Count-up animations */
```

### Key Animations
- **Page Load**: Sequential fade-up with stagger
- **Scroll Trigger**: Intersection Observer at 15% from bottom
- **Count-Up**: 2-second duration, ease-out-cubic
- **Hover**: translateY -4px + shadow increase
- **Globe**: Continuous rotation + pulsing dots

## 📊 Data & Content

### Key Metrics (Update as needed)
```typescript
const metrics = {
  capitalDeployed: '$12.4B',
  capacityManaged: '18.2 GW',
  projectsClosed: '340+',
  homesPowered: '2.8M',
  onTimeDelivery: '96%',
  countries: '34',
}
```

### Project Data Structure
```typescript
interface Project {
  name: string
  location: string
  capacity: string
  technology: 'Solar' | 'Wind' | 'Storage' | 'H2'
  status: 'OPERATIONAL' | 'CONSTRUCTION' | 'DEVELOPMENT'
  cod: string
  investment: string
  image: string
}
```

## 🔧 Customization Guide

### Adding New Projects
1. Open `/components/home/FeaturedProjects.tsx`
2. Add to `projects` array:
```typescript
{
  name: 'Project Name',
  location: 'City, Country',
  capacity: '250 MW',
  technology: 'Solar',
  status: 'OPERATIONAL',
  cod: 'Q3 2024',
  image: 'https://...',
}
```

### Updating Metrics
1. Open `/components/home/PortfolioImpact.tsx`
2. Modify `metrics` array
3. Adjust animation duration if needed

### Changing Colors
1. Update `tailwind.config.js` extend.colors
2. Update CSS variables in `app/globals.css`
3. Rebuild: `npm run build`

### Adding New Pages
```bash
# Create page directory
mkdir app/new-page

# Create page component
touch app/new-page/page.tsx
```

Template:
```typescript
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function NewPage() {
  return (
    <main>
      <Navigation />
      {/* Your content */}
      <Footer />
    </main>
  )
}
```

## 🎯 SEO Optimization

### Meta Tags (in layout.tsx)
```typescript
export const metadata: Metadata = {
  title: 'Helio Aegis | Renewable Energy Finance',
  description: 'We originate, finance, and deliver utility-scale renewable infrastructure...',
  keywords: 'renewable energy, project finance, solar, wind, infrastructure',
  openGraph: {
    title: 'Helio Aegis',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

### Structured Data
Add JSON-LD to pages for rich snippets:
```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Helio Aegis",
  "url": "https://helioaegis.com",
  "logo": "https://helioaegis.com/logo.png"
}
</script>
```

## 🚀 Performance Optimization

### Image Optimization
- Use Next.js Image component
- Serve WebP/AVIF formats
- Lazy load below fold
- Optimize source images (< 500KB)

### Code Splitting
- Route-based automatic splitting
- Dynamic imports for heavy components
- Tree shaking enabled

### Caching Strategy
- Static assets: 1 year cache
- API routes: 5 minutes cache
- Pages: ISR with 60s revalidation

## 🧪 Testing Checklist

### Pre-Launch
- [ ] All pages load without errors
- [ ] Mobile responsive (320px - 2560px)
- [ ] Forms submit correctly
- [ ] Navigation works on all pages
- [ ] Images load and are optimized
- [ ] Animations respect reduced-motion
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] SEO meta tags present
- [ ] Social media previews work

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast WCAG AA
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

## 📞 Maintenance

### Regular Updates
- **Monthly**: Update market ticker data
- **Quarterly**: Add new projects to portfolio
- **Quarterly**: Update metrics (capital deployed, capacity, etc.)
- **Annually**: Refresh insights/articles
- **As needed**: Update team photos, press releases

### Monitoring
- Google Analytics for traffic
- Vercel Analytics for performance
- Hotjar for user behavior
- Sentry for error tracking

## 🔐 Security

### Best Practices
- Environment variables for sensitive data
- HTTPS only (enforced)
- Security headers configured
- Regular dependency updates
- Input validation on forms
- Rate limiting on API routes

## 📚 Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

### Design References
- Ørsted: https://orsted.com
- NextEra Energy: https://nexteraenergy.com
- Brookfield Renewable: https://brookfieldrenewable.com
- Linear: https://linear.app (dark mode reference)

---

**Version**: 1.0.0  
**Last Updated**: March 2025  
**Maintained by**: Helio Aegis Technical Team
