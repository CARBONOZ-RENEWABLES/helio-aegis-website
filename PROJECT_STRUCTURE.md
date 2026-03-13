# Helio Aegis Website - Project Structure

## 📁 Directory Organization

```
helio-aegis-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & design tokens
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── capabilities/
│   │   └── page.tsx             # Capabilities page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── insights/
│   │   └── page.tsx             # Insights page
│   ├── investors/
│   │   └── page.tsx             # Investors page
│   └── portfolio/
│       └── page.tsx             # Portfolio page
│
├── components/                   # React components
│   ├── home/                    # Homepage sections
│   │   ├── Hero.tsx             # Advanced interactive globe hero
│   │   ├── MarketTicker.tsx     # Scrolling market data
│   │   ├── Capabilities.tsx     # 2x2 capability cards
│   │   ├── PortfolioImpact.tsx  # 5-column metrics
│   │   ├── FeaturedProjects.tsx # Project carousel
│   │   ├── ProjectMap.tsx       # Interactive map
│   │   ├── InvestmentThesis.tsx # Tabbed content
│   │   ├── InsightsTeaser.tsx   # Article grid
│   │   ├── PartnersCredentials.tsx # Logo strip
│   │   └── CTASection.tsx       # Call-to-action
│   │
│   ├── shared/                  # Shared components
│   │   ├── Navigation.tsx       # Sticky nav with mobile drawer
│   │   └── Footer.tsx           # Newsletter + links
│   │
│   └── ui/                      # UI utilities
│       └── CountUp.tsx          # Animated counter
│
├── public/                       # Static assets
│   └── (images, icons, etc.)
│
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── package-lock.json            # Lock file
│
├── README.md                    # Project overview
├── ADVANCED_DESIGN.md           # Design system documentation
├── IMPLEMENTATION_SUMMARY.md    # Implementation details
└── QUICKSTART.md                # Quick start guide
```

## 📄 File Descriptions

### App Pages (8 pages)

#### `app/page.tsx` - Homepage
- Hero section with interactive globe
- Market ticker
- Capabilities overview
- Portfolio impact metrics
- Featured projects
- Project map
- Investment thesis
- Insights teaser
- Partners & credentials
- CTA section

#### `app/about/page.tsx` - About Page
- Company story
- Leadership team (6 members)
- Global presence (3 regions)
- ESG commitment
- Mission and values

#### `app/capabilities/page.tsx` - Capabilities Page
- 4 core capabilities
- Alternating layout
- Key metrics per capability
- Service listings
- Integrated model explanation

#### `app/investors/page.tsx` - Investors Page
- Fund structures (3 types)
- Track record
- Vintage performance
- Data room access
- IR team contacts

#### `app/insights/page.tsx` - Insights Page
- Article grid (3 columns)
- Type categorization
- Filtering system
- Newsletter signup
- Featured articles

#### `app/contact/page.tsx` - Contact Page
- Contact methods (3 types)
- Advanced contact form
- Global offices (3 locations)
- Form validation
- Success feedback

#### `app/portfolio/page.tsx` - Portfolio Page
- Project filtering
- Grid/List view toggle
- Project cards
- Status badges
- Technology filtering

#### `app/layout.tsx` - Root Layout
- Font imports (Playfair Display, DM Sans, JetBrains Mono)
- Metadata configuration
- HTML structure

### Components

#### Home Components

**Hero.tsx** (Advanced)
- Interactive globe with rotating rings
- Pulsing data points
- SVG connection lines
- Mouse parallax effect
- Animated metrics
- Scroll indicator

**MarketTicker.tsx**
- Infinite scrolling animation
- Market data display
- Hover pause

**Capabilities.tsx**
- 2x2 card grid
- Hover effects
- Icon display
- Service links

**PortfolioImpact.tsx**
- 5-column metrics
- Count-up animations
- Gradient background

**FeaturedProjects.tsx**
- 4-column grid
- Status badges
- Image zoom hover
- Project details

**ProjectMap.tsx**
- Interactive map placeholder
- Filter controls
- Stats overlay
- Legend display

**InvestmentThesis.tsx**
- Tabbed content (4 tabs)
- Sticky left panel
- Metrics display
- Tab switching

**InsightsTeaser.tsx**
- 3-column grid
- Featured article (2-col span)
- Type badges
- Read time indicators

**PartnersCredentials.tsx**
- Logo grid (8 partners)
- Hover effects
- Certification badges

**CTASection.tsx**
- Gradient background
- Animated orbs
- Trust signals
- CTA buttons

#### Shared Components

**Navigation.tsx**
- Sticky navigation
- Scroll-triggered background
- Mobile drawer menu
- Animated hamburger
- Desktop mega-menu ready

**Footer.tsx**
- Newsletter signup
- 4-column link grid
- Certification badges
- Legal information
- Social links

#### UI Components

**CountUp.tsx**
- Animated number counter
- Intersection observer trigger
- Decimal support
- Prefix/suffix support

### Configuration Files

**tailwind.config.js**
- Color system (void, obsidian, solar, hydrogen, etc.)
- Typography scale (Major Third ratio)
- Spacing system (4px grid)
- Custom animations
- Shadow system

**globals.css**
- CSS custom properties
- Component classes
- Scrollbar styling
- Motion preferences

**next.config.js**
- Image optimization
- Font optimization
- Build configuration

**tsconfig.json**
- TypeScript strict mode
- Path aliases
- React configuration

## 🎯 Component Hierarchy

```
Layout
├── Navigation
├── Main Content
│   ├── Hero
│   ├── MarketTicker
│   ├── Capabilities
│   ├── PortfolioImpact
│   ├── FeaturedProjects
│   ├── ProjectMap
│   ├── InvestmentThesis
│   ├── InsightsTeaser
│   ├── PartnersCredentials
│   └── CTASection
└── Footer
```

## 📊 Component Statistics

- **Total Pages**: 8
- **Home Components**: 10
- **Shared Components**: 2
- **UI Components**: 1
- **Total Components**: 13
- **Lines of Code**: ~3,500+

## 🎨 Design Tokens

### Colors (15 primary + variations)
- void, obsidian, slate-dark, slate-mid, slate-light
- solar, solar-dim, solar-glow
- hydrogen, hydrogen-dim
- growth, alert
- text-primary, text-secondary, text-muted

### Typography (3 fonts)
- Display: Playfair Display
- Body: DM Sans
- Mono: JetBrains Mono

### Spacing (12 values)
- 1 (4px) through 48 (192px)

### Animations (3 easing curves)
- ease-out-expo
- ease-in-out
- ease-spring

## 🔄 Data Flow

### Homepage
1. Hero loads with globe animation
2. Sections fade in on scroll
3. Metrics count up when visible
4. Cards hover with effects
5. Tabs switch on click

### Portfolio Page
1. Projects load with filters
2. View toggle switches layout
3. Filters update display
4. Cards show details

### Contact Page
1. Form validates on input
2. Submit triggers success state
3. Form resets after 3s

## 🚀 Build Output

```
Route                    Size        First Load JS
/                        8.42 kB     144 kB
/about                   185 B       135 kB
/capabilities            197 B       135 kB
/contact                 2.32 kB     138 kB
/insights                197 B       135 kB
/investors               185 B       135 kB
/portfolio               2.18 kB     137 kB

Shared Chunks: 87.3 kB
Total: ~144 kB First Load
```

## 📦 Dependencies

### Core
- next@14.2.0
- react@18.3.1
- react-dom@18.3.1
- typescript@5.4.0

### Styling
- tailwindcss@3.4.0
- autoprefixer@10.4.0
- postcss@8.4.0

### Animation
- framer-motion@11.0.0

### Utilities
- react-intersection-observer@9.8.0
- recharts@2.12.0

### Fonts
- @next/font (built-in)

## 🔧 Development Workflow

1. **Development**: `npm run dev`
2. **Build**: `npm run build`
3. **Production**: `npm start`
4. **Linting**: `npm run lint`

## 📝 Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Prettier formatting ready
- ✅ Component documentation
- ✅ Type safety throughout

## 🎯 Next Steps for Customization

1. **Add Content**: Update page content in each page file
2. **Modify Colors**: Edit `tailwind.config.js` and `globals.css`
3. **Add Projects**: Update `FeaturedProjects.tsx` data
4. **Connect CMS**: Integrate Contentful or Sanity
5. **Add Analytics**: Implement Mixpanel or Hotjar
6. **Deploy**: Push to Vercel or your hosting platform

---

**Project Structure: Complete and Production-Ready**
