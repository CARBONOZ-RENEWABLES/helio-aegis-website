# Helio Aegis - Renewable Energy Finance & Project Management

A world-class corporate website for Helio Aegis, a global renewable energy project management and energy finance company.

## 🎯 Overview

This website positions Helio Aegis at the institutional tier alongside Ørsted, NextEra Energy, and Brookfield Renewable. Built as a primary capital-raising and partnership acquisition tool for institutional investors, project developers, and government agencies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Fonts**: Playfair Display, DM Sans, JetBrains Mono

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Design System

### Color Palette
- **Primary Background**: `#080C14` (void)
- **Card Background**: `#0D1421` (obsidian)
- **Accent**: `#F5A623` (solar)
- **Secondary Accent**: `#00C2FF` (hydrogen)
- **Success**: `#22C55E` (growth)

### Typography
- **Display**: Playfair Display (headlines)
- **Body**: DM Sans (body text)
- **Mono**: JetBrains Mono (data, metrics)

### Spacing
Based on 4px grid system with responsive clamp values.

## 📄 Page Structure

### Homepage Sections
1. **Hero** - Command center with animated globe visualization
2. **Market Ticker** - Live scrolling market data
3. **Capabilities** - Two disciplines, one platform
4. **Portfolio Impact** - Animated metrics showcase
5. **Featured Projects** - Project card carousel
6. **Project Map** - Interactive global presence map
7. **Investment Thesis** - Tabbed content (Track Record, Risk, Pipeline, ESG)
8. **Insights** - Market intelligence and thought leadership
9. **Partners** - Institutional partners and certifications
10. **CTA** - Meeting request and deck download

## 🎭 Key Features

- **Dark Mode First**: Sophisticated dark theme with light mode toggle capability
- **Institutional Design**: Bloomberg Terminal meets architectural portfolio
- **Animated Metrics**: Count-up animations on scroll
- **Interactive Map**: Global project locations with hover tooltips
- **Responsive**: Mobile-first design, fully responsive
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliant

## 📊 Brand Voice

**Authoritative. Precise. Global.**

Understated confidence — never boastful, always credible. Numbers speak. Results lead. Every word earns its place.

## 🔧 Customization

### Adding New Projects
Edit `/components/home/FeaturedProjects.tsx` and add to the `projects` array.

### Updating Metrics
Edit `/components/home/PortfolioImpact.tsx` to modify the metrics displayed.

### Changing Colors
Update `tailwind.config.js` and `app/globals.css` for color system changes.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Laptop**: 1024px - 1439px
- **Desktop**: 1440px+

## 🌐 Deployment

Optimized for deployment on:
- **Vercel** (recommended)
- **AWS CloudFront**
- **Netlify**

```bash
# Build for production
npm run build

# The output will be in the .next folder
```

## 📈 Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse Score**: 90+ (mobile), 95+ (desktop)

## 🔐 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_SITE_URL=https://helioaegis.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## 📝 License

© 2025 Helio Aegis Capital Partners LLC. All rights reserved.

## 🤝 Support

For technical support or inquiries:
- **Email**: info@helioaegis.com
- **Investors**: investors@helioaegis.com

---

Built with precision for institutional capital markets.
# helio-aegis-website
