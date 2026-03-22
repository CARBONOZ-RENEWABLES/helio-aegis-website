# Insights System Documentation

## Overview

A comprehensive insights system for Helio Aegis featuring full article pages with images, related content, and professional design. Built for institutional audiences with rich content including market research, policy analysis, and thought leadership.

## Features

### Core Functionality
- **Full Article Pages**: Complete articles with sections, images, and key takeaways
- **Rich Content**: Multiple sections per article with embedded images and charts
- **Author Attribution**: Author information with roles and expertise
- **Related Articles**: Smart suggestions based on category matching
- **Image Handling**: Intelligent image placeholders with category-specific icons
- **Responsive Design**: Mobile-first design with optimal reading experience
- **SEO Optimization**: Proper metadata and structured content

### Content Types
- **Research**: In-depth market analysis and data-driven insights
- **Commentary**: Expert opinions and market perspectives
- **Report**: Comprehensive market reports and investment guides

### Categories
- **Market Analysis**: Market trends and investment opportunities
- **Policy**: Regulatory updates and policy implications
- **Technology**: Technology developments and cost curves
- **Regional**: Geographic market analysis and opportunities

## File Structure

```
components/insights/
├── insightsData.ts         # All articles with full content
├── InsightImage.tsx        # Image component with placeholders
├── index.ts                # Clean exports
└── README.md               # This documentation

app/insights/
├── page.tsx                # Insights listing page
└── [id]/
    └── page.tsx            # Individual article page
```

## Data Structure

### Insight Interface
```typescript
interface Insight {
  id: number;
  type: InsightType;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: InsightCategory;
  featured?: boolean;
  featuredImage: InsightImage;
  author: string;
  authorRole: string;
  sections: InsightSection[];
  keyTakeaways: string[];
}
```

### Section Structure
```typescript
interface InsightSection {
  heading: string;
  content: string;
  image?: InsightImage;
}
```

### Image Structure
```typescript
interface InsightImage {
  src: string;
  alt: string;
  caption: string;
}
```

## Current Content (6 Articles)

### 1. The 2025 Renewable Energy Finance Outlook (Research)
- **Author**: Sarah Chen, Head of Energy Finance
- **Category**: Market Analysis
- **Sections**: 5 sections with 4 images
- **Key Topics**: Interest rates, capital deployment, emerging opportunities

### 2. IRA Extension: What It Means for Project Economics (Commentary)
- **Author**: Marcus Rodriguez, VP Project Development
- **Category**: Policy
- **Sections**: 4 sections with 1 image
- **Key Topics**: Tax credits, project IRR, refinancing opportunities

### 3. Global Green Hydrogen Market Report (Report)
- **Author**: Dr. Amara Okonkwo, ESG & Impact Director
- **Category**: Technology
- **Sections**: 5 sections with 3 images
- **Key Topics**: Market sizing, cost curves, regional opportunities

### 4. European Grid Constraints: Opportunities for Storage (Commentary)
- **Author**: Elena Vasquez, Chief Executive Officer
- **Category**: Market Analysis
- **Sections**: 4 sections with 2 images
- **Key Topics**: Grid congestion, storage economics, policy support

### 5. Offshore Wind Cost Curve Evolution (Research)
- **Author**: David Park, Chief Operating Officer
- **Category**: Technology
- **Sections**: 5 sections with 3 images
- **Key Topics**: Capex trends, technology advancements, investment opportunities

### 6. MENA Renewable Energy Investment Guide (Report)
- **Author**: Sarah Chen, Head of Energy Finance
- **Category**: Regional
- **Sections**: 5 sections with 3 images
- **Key Topics**: Market overview, regulatory landscape, investment opportunities

## Usage

### Viewing Articles
- **Insights Page**: `/insights` - Lists all articles with filtering
- **Individual Article**: `/insights/[id]` - Full article with images and related content
- **Homepage Teaser**: First 3 articles displayed on homepage

### Adding New Articles
Edit `components/insights/insightsData.ts`:

```typescript
{
  id: 7,
  type: 'Research',
  date: 'Feb 1, 2025',
  title: 'Your Article Title',
  excerpt: 'Brief description of the article content.',
  readTime: '10 min read',
  category: 'Market Analysis',
  featuredImage: {
    src: '/images/insights/your-image.jpg',
    alt: 'Image description',
    caption: 'Image caption with context',
  },
  author: 'Author Name',
  authorRole: 'Author Title',
  sections: [
    {
      heading: 'Section Title',
      content: 'Section content...',
      image: {
        src: '/images/insights/section-image.jpg',
        alt: 'Section image description',
        caption: 'Section image caption',
      },
    },
  ],
  keyTakeaways: [
    'Key point 1',
    'Key point 2',
  ],
}
```

## Image System

### Image Placeholders
The `InsightImage` component automatically handles missing images with intelligent placeholders:

- **Icons**: Category-specific icons for different chart types
- **Fallback**: Professional placeholder with image title and caption
- **Responsive**: Maintains aspect ratio across all devices

### Image Icons Mapping
```typescript
const imageIcons = {
  'renewable-finance-2025.jpg': '📊',
  'capital-deployment.jpg': '💰',
  'interest-rates.jpg': '📈',
  'investor-allocation.jpg': '🏦',
  'emerging-tech.jpg': '⚡',
  // ... more mappings
};
```

### Adding Real Images
1. Add images to `/public/images/insights/`
2. Update image paths in `insightsData.ts`
3. Images will automatically load when available

## Styling

### Color System
- **Research**: Hydrogen blue (`#00C2FF`)
- **Commentary**: Solar amber (`#F5A623`)
- **Report**: Growth green (`#22C55E`)

### Typography
- **Headlines**: Playfair Display
- **Body Text**: DM Sans
- **Metadata**: JetBrains Mono

### Layout
- **Max Width**: 4xl (896px) for optimal reading
- **Sidebar**: Sticky key takeaways and author info
- **Images**: Full-width with captions
- **Spacing**: Consistent vertical rhythm

## SEO Features

### Metadata
- Dynamic page titles with article name
- Meta descriptions from article excerpts
- Keywords based on category and type
- Open Graph tags for social sharing

### URL Structure
- Clean URLs: `/insights/1`, `/insights/2`, etc.
- Breadcrumb navigation
- Related article linking

## Responsive Design

### Desktop (1024px+)
- Two-column layout with sidebar
- Large featured images
- Optimal reading width

### Tablet (768–1023px)
- Single column layout
- Adjusted image sizes
- Maintained readability

### Mobile (<768px)
- Stacked layout
- Touch-friendly navigation
- Optimized image sizes

## Performance

### Image Optimization
- Lazy loading for section images
- Priority loading for featured images
- Intelligent fallbacks for missing images

### Code Splitting
- Dynamic imports where beneficial
- Minimal bundle size
- Fast page loads

## Analytics Integration

### Tracking Events
- Article views
- Read time tracking
- Related article clicks
- Newsletter subscriptions

### Implementation
```typescript
// Track article view
analytics.track('article_viewed', {
  article_id: insight.id,
  article_title: insight.title,
  category: insight.category,
  author: insight.author,
});
```

## Content Guidelines

### Article Structure
1. **Executive Summary**: Key points upfront
2. **Main Sections**: 3-5 sections with clear headings
3. **Supporting Data**: Charts and images where relevant
4. **Key Takeaways**: 3-5 bullet points
5. **Author Attribution**: Name and role

### Writing Style
- **Authoritative**: Expert-level analysis
- **Precise**: Specific data and metrics
- **Professional**: Institutional audience
- **Actionable**: Clear implications and recommendations

### Image Requirements
- **High Quality**: Professional charts and graphics
- **Relevant**: Directly supports article content
- **Captioned**: Clear descriptions and context
- **Consistent**: Matching visual style

## Customization

### Adding New Categories
1. Update `InsightCategory` type in `insightsData.ts`
2. Add category to filtering logic in insights page
3. Update color scheme if needed

### Adding New Content Types
1. Update `InsightType` type in `insightsData.ts`
2. Add type colors to `typeColors` object
3. Update filtering and display logic

### Modifying Layout
- Edit article page template in `app/insights/[id]/page.tsx`
- Adjust responsive breakpoints in Tailwind classes
- Modify sidebar content and positioning

## Future Enhancements

### Content Features
- Video integration for multimedia articles
- Interactive charts and data visualizations
- PDF download for reports
- Social sharing buttons
- Comment system for engagement

### Technical Features
- Full-text search across articles
- Advanced filtering (date range, author, etc.)
- Reading progress indicator
- Bookmark functionality
- Email article sharing

### Analytics
- Reading completion rates
- Popular article tracking
- User engagement metrics
- A/B testing for layouts

## Support

For questions about the insights system:
- Review this documentation
- Check `insightsData.ts` for content structure
- Examine existing articles for formatting examples
- Test responsive design across devices

---

The insights system provides a professional platform for sharing market intelligence and thought leadership with institutional audiences.