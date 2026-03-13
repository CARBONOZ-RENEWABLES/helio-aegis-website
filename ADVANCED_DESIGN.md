# Helio Aegis - Advanced Corporate Website

## 🎯 Overview

A world-class institutional-grade corporate website for Helio Aegis, positioning the company at the tier of Ørsted, NextEra Energy, and Brookfield Renewable. Built as a primary capital-raising and partnership acquisition tool.

## ✨ Advanced Design Features

### Hero Section
- **Interactive Globe Visualization**: Animated 3D globe with rotating rings, pulsing data points, and connection lines
- **Mouse Parallax**: Globe responds to cursor movement for immersive interaction
- **Gradient Text**: Modern gradient text effects on headlines
- **Advanced Metrics**: Animated count-up metrics with institutional styling
- **Minimal Animations**: Smooth, purposeful transitions that respect institutional aesthetic

### Page Designs

#### Homepage
- **Advanced Hero**: Interactive globe with data visualization
- **Market Ticker**: Real-time scrolling market data
- **Capabilities Grid**: 2x2 card layout with hover effects
- **Portfolio Impact**: 5-column metrics with count-up animations
- **Featured Projects**: Carousel with status badges and hover effects
- **Project Map**: Interactive global presence visualization
- **Investment Thesis**: Tabbed content with institutional data
- **Insights Teaser**: Featured article grid with type categorization
- **Partners Strip**: Logo grid with hover effects
- **CTA Section**: High-impact call-to-action with trust signals

#### About Page
- **Company Story**: Narrative-driven content with mission and values
- **Leadership Team**: 6-member team with expertise tags
- **Global Presence**: 3-region office overview
- **ESG Commitment**: Climate impact metrics and certifications
- **Stats Strip**: Key company metrics

#### Capabilities Page
- **4 Core Capabilities**: Project Development, Energy Finance, Asset Management, Technology
- **Alternating Layout**: Left-right alternating content for visual interest
- **Key Metrics Cards**: Statistics for each capability
- **Service Lists**: Detailed service offerings
- **Integrated Model**: Explanation of competitive advantage

#### Investors Page
- **Fund Structures**: 3 fund types with detailed metrics
- **Track Record**: Vintage year performance table
- **Performance Data**: IRR, TVPI, and deployment metrics
- **Data Room Access**: Gated content for institutional investors
- **IR Team**: Contact information for investor relations

#### Insights Page
- **Article Grid**: 3-column layout with featured article
- **Type Categorization**: Research, Commentary, Report badges
- **Category Filtering**: Filter by content type and category
- **Newsletter CTA**: Email subscription form
- **Read Time Indicators**: Content length estimates

#### Contact Page
- **Multiple Contact Methods**: 3 inquiry types with direct contact info
- **Advanced Form**: Multi-field contact form with inquiry type selection
- **Global Offices**: 3 regional office locations with details
- **Success Feedback**: Form submission confirmation

## 🎨 Design System

### Color Palette
- **Primary Background**: `#080C14` (void)
- **Card Background**: `#0D1421` (obsidian)
- **Accent**: `#F5A623` (solar - luminous amber)
- **Secondary Accent**: `#00C2FF` (hydrogen - clean energy blue)
- **Success**: `#22C55E` (growth)

### Typography
- **Display**: Playfair Display (headlines)
- **Body**: DM Sans (body text)
- **Mono**: JetBrains Mono (data, metrics)

### Spacing
- **Base Grid**: 4px
- **Section Padding**: Responsive clamp values
- **Max Width**: 1440px

## 🚀 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (minimal, purposeful)
- **Charts**: Recharts
- **Fonts**: Google Fonts (Playfair Display, DM Sans, JetBrains Mono)

## 📦 Installation & Setup

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

## 📄 Page Structure

### Main Pages
1. **Homepage** (`/`) - Primary landing page with all key sections
2. **About** (`/about`) - Company story, leadership, global presence
3. **Capabilities** (`/capabilities`) - Service offerings and expertise
4. **Portfolio** (`/portfolio`) - Project listings with filtering
5. **Investors** (`/investors`) - Fund structures and performance
6. **Insights** (`/insights`) - Market research and thought leadership
7. **Contact** (`/contact`) - Contact forms and office locations

### Component Structure
```
components/
├── home/
│   ├── Hero.tsx (Advanced interactive globe)
│   ├── MarketTicker.tsx
│   ├── Capabilities.tsx
│   ├── PortfolioImpact.tsx
│   ├── FeaturedProjects.tsx
│   ├── ProjectMap.tsx
│   ├── InvestmentThesis.tsx
│   ├── InsightsTeaser.tsx
│   ├── PartnersCredentials.tsx
│   └── CTASection.tsx
├── shared/
│   ├── Navigation.tsx (Sticky nav with mobile drawer)
│   └── Footer.tsx (Newsletter + links)
└── ui/
    └── CountUp.tsx (Animated metrics)
```

## 🎭 Animation Philosophy

### Principles
1. **Purposeful**: Every animation has functional reason
2. **Institutional**: Smooth, controlled, never playful
3. **Performance-First**: GPU-accelerated properties only
4. **Accessibility**: Respects `prefers-reduced-motion`

### Easing Curves
- `ease-out-expo`: Most exits and transitions
- `ease-in-out`: Content transitions
- `ease-spring`: Only for CTAs

### Durations
- **Instant**: 100ms (micro-feedback)
- **Fast**: 200ms (hover states)
- **Normal**: 350ms (content transitions)
- **Slow**: 600ms (page sections)
- **XSlow**: 1200ms (count-up animations)

## 🔧 Customization

### Adding New Projects
Edit `/components/home/FeaturedProjects.tsx` and add to the `projects` array.

### Updating Metrics
Edit `/components/home/PortfolioImpact.tsx` to modify displayed metrics.

### Changing Colors
Update `tailwind.config.js` and `app/globals.css` for color system changes.

### Modifying Fund Structures
Edit `/app/investors/page.tsx` to update fund offerings.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Laptop**: 1024px - 1439px
- **Desktop**: 1440px+

### Mobile Optimizations
- Simplified globe visualization (static image fallback)
- Stacked layouts for cards and grids
- Touch-friendly button sizes
- Optimized typography scaling

## 🌐 Deployment

### Recommended Platforms
- **Vercel** (recommended - optimized for Next.js)
- **AWS CloudFront**
- **Netlify**

### Build & Deploy
```bash
# Build for production
npm run build

# Output in .next folder
# Deploy to your platform
```

## 📈 Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse**: 90+ (mobile), 95+ (desktop)

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://helioaegis.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## 🎯 Key Features

### Institutional Design
- Bloomberg Terminal meets architectural portfolio aesthetic
- Data-rich visualizations
- Authoritative typography
- Sophisticated color system

### Advanced Interactions
- Interactive globe with parallax
- Smooth scroll animations
- Hover microinteractions
- Tab-based content switching
- Form validation and feedback

### Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Motion preferences respected

### SEO Optimized
- Structured data (JSON-LD)
- Meta tags and descriptions
- Sitemap generation
- Open Graph tags
- Canonical URLs

## 📊 Brand Voice

**Authoritative. Precise. Global.**

Understated confidence — never boastful, always credible. Numbers speak. Results lead. Every word earns its place.

## 🤝 Support

For technical support or inquiries:
- **Email**: info@helioaegis.com
- **Investors**: investors@helioaegis.com

## 📝 License

© 2025 Helio Aegis Capital Partners LLC. All rights reserved.

---

Built with precision for institutional capital markets.
