# 🚀 Quick Start Guide

Get the Helio Aegis website running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)

## Installation

```bash
# 1. Navigate to project directory
cd helio-aegis-website

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
helio-aegis-website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── portfolio/         # Portfolio page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── home/             # Homepage sections
│   └── shared/           # Reusable components
├── public/               # Static assets
└── tailwind.config.js    # Design system config
```

## 🎨 Key Components

### Homepage Sections
- **Hero**: Main landing section with animated globe
- **MarketTicker**: Scrolling market data
- **Capabilities**: Service overview cards
- **PortfolioImpact**: Animated metrics
- **FeaturedProjects**: Project showcase
- **ProjectMap**: Interactive global map
- **InvestmentThesis**: Tabbed investor content
- **InsightsTeaser**: Latest articles
- **PartnersCredentials**: Partner logos
- **CTASection**: Call-to-action

### Shared Components
- **Navigation**: Sticky header with mobile menu
- **Footer**: Comprehensive footer with links

## 🎯 Common Tasks

### Add a New Project
Edit `components/home/FeaturedProjects.tsx`:
```typescript
const projects = [
  {
    name: 'Your Project',
    location: 'City, Country',
    capacity: '250 MW',
    technology: 'Solar',
    status: 'OPERATIONAL',
    cod: 'Q3 2024',
    image: 'https://...',
  },
  // ... more projects
]
```

### Update Metrics
Edit `components/home/PortfolioImpact.tsx`:
```typescript
const metrics = [
  { value: 12.4, suffix: 'B', prefix: '$', label: 'Capital Deployed' },
  // ... more metrics
]
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  solar: '#F5A623',  // Primary accent
  hydrogen: '#00C2FF', // Secondary accent
  // ... more colors
}
```

### Add a New Page
```bash
# Create directory
mkdir app/new-page

# Create page file
touch app/new-page/page.tsx
```

Basic page template:
```typescript
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function NewPage() {
  return (
    <main>
      <Navigation />
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="font-display text-5xl">Page Title</h1>
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

## 🎨 Design System

### Colors
- `bg-void` - Main background (#080C14)
- `bg-obsidian` - Card background (#0D1421)
- `text-solar` - Accent color (#F5A623)
- `text-text-primary` - Main text (#F0F4F8)
- `text-text-secondary` - Secondary text (#8DA0B8)

### Typography
- `font-display` - Headlines (Playfair Display)
- `font-body` - Body text (DM Sans)
- `font-mono` - Data/metrics (JetBrains Mono)

### Spacing
- `section-padding` - Standard section spacing
- `container-custom` - Max-width container
- `card` - Standard card styling

### Buttons
- `btn-primary` - Solar filled button
- `btn-secondary` - Solar outline button
- `btn-ghost` - Transparent button

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📱 Responsive Design

The site is mobile-first and fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

Test at different breakpoints:
- iPhone SE: 375px
- iPad: 768px
- Laptop: 1024px
- Desktop: 1440px

## 🎬 Animations

All animations use Framer Motion:
```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

Scroll-triggered animations use Intersection Observer:
```typescript
import { useInView } from 'react-intersection-observer'

const [ref, inView] = useInView({ triggerOnce: true })

<div ref={ref}>
  <motion.div animate={inView ? { opacity: 1 } : {}}>
    Content
  </motion.div>
</div>
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Build errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check ESLint errors
npm run lint
```

### Images not loading
- Verify image URLs are accessible
- Check `next.config.js` image domains
- Ensure images are < 2MB

## 📚 Learn More

- [Full Documentation](./DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🆘 Need Help?

- Check [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed info
- Review component code for examples
- Search Next.js documentation
- Contact: tech@helioaegis.com

---

**Happy coding!** 🚀
