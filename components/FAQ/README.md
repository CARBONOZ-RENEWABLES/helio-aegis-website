# FAQ System Documentation

## Overview

A world-class, institutionally-designed FAQ system for Helio Aegis featuring real-time search, category filtering, accordion interactions, and expert contact callouts. Designed for sophisticated visitors: institutional investors, project developers, and government counterparties.

## Features

### Core Functionality
- **Real-time Search**: Full-text search across questions, answers, and categories
- **Category Filtering**: 7 categories with question counts (All, Energy Finance, Project Development, Investors & Funds, ESG & Compliance, Process & Timelines, About Helio Aegis)
- **Accordion Interface**: Single-open accordion with smooth height animations
- **Key Data Highlights**: Amber-bordered callout boxes with critical metrics
- **Related Questions**: Smart suggestions for related FAQ items
- **Expert Contact Cards**: Category-specific expert contact information with direct email links
- **Feedback System**: "Was this helpful?" micro-feedback on each answer
- **JSON-LD Schema**: SEO-optimized rich snippets for Google FAQ results
- **Analytics Events**: GTM-compatible event tracking for opens and feedback

### Design
- Dark mode first with institutional aesthetic
- Color-coded category badges
- Responsive design (mobile, tablet, desktop)
- Smooth transitions and animations
- WCAG 2.1 AA accessibility compliance
- Keyboard navigation support

## File Structure

```
components/FAQ/
├── faqData.ts              # All questions, categories, experts
├── faqSchema.ts            # JSON-LD schema generator
├── FAQSearch.tsx           # Search input with filtering
├── FAQTabs.tsx             # Category tab strip
├── FAQItem.tsx             # Individual accordion item
├── FAQAccordion.tsx        # Accordion list container
├── FAQExpertCallout.tsx    # Expert contact card
├── FAQSection.tsx          # Main component wrapper
└── index.ts                # Clean exports

app/faq/
└── page.tsx                # Standalone /faq page
```

## Usage

### Standalone FAQ Page
```tsx
// Automatically available at /faq
// Full FAQ with all categories and search
```

### Embedded on Other Pages
```tsx
import FAQSection from '@/components/FAQ/FAQSection';

// Full FAQ
<FAQSection category="all" showHeader={true} />

// Filtered by category (no header)
<FAQSection category="finance" showHeader={false} />
<FAQSection category="investors" showHeader={false} />
<FAQSection category="development" showHeader={false} />
```

### Current Integrations
- **Homepage** (`/`): Full FAQ section before CTA
- **Capabilities** (`/capabilities`): Project Development FAQ
- **Investors** (`/investors`): Investors & Funds FAQ
- **Contact** (`/contact`): Full FAQ section
- **Standalone** (`/faq`): Complete FAQ page with schema

## Content Structure

### 27 FAQ Items Across 6 Categories

**Energy Finance (6 items)**
- Deal sizes and structures
- Green bond placement
- ITC/PTC monetization
- Advisory fees
- International developer support

**Project Development (6 items)**
- Development stage engagement
- Equity positions
- Grid interconnection management
- Project management tools
- EPC procurement
- Community benefit agreements

**Investors & Funds (6 items)**
- Minimum commitments
- Return profiles
- LP reporting
- Non-US investor access
- Fee structures
- Co-investment policies

**ESG & Compliance (5 items)**
- ESG frameworks alignment
- SFDR classification
- Carbon avoided measurement
- Biodiversity policy
- TCFD disclosures

**Process & Timelines (4 items)**
- Mandate to close timelines
- Due diligence requirements
- Project evaluation process
- Geographic priorities

**About Helio Aegis (3 items)**
- Company track record
- Team expertise
- Office locations

## Component Props

### FAQSection
```tsx
interface FAQSectionProps {
  category?: Category;        // 'all' | 'finance' | 'development' | 'investors' | 'esg' | 'process' | 'about'
  showHeader?: boolean;       // Show "Answers for serious inquiries" header
}
```

### FAQSearch
```tsx
interface FAQSearchProps {
  onSearch: (results: FAQItem[]) => void;
}
```

### FAQTabs
```tsx
interface FAQTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}
```

### FAQAccordion
```tsx
interface FAQAccordionProps {
  items: FAQItem[];
  activeCategory: Category;
}
```

### FAQItem
```tsx
interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}
```

### FAQExpertCallout
```tsx
interface FAQExpertCalloutProps {
  category: Category;
}
```

## Styling

### Color System
- **Background**: `#0D1421` (obsidian)
- **Card Background**: `#141D2E` (slate-dark)
- **Accent**: `#F5A623` (solar)
- **Secondary Accent**: `#00C2FF` (hydrogen)
- **Success**: `#22C55E` (growth)
- **Text Primary**: `#F0F4F8`
- **Text Secondary**: `#8DA0B8`
- **Text Muted**: `#4A6080`

### Category Badge Colors
- **Energy Finance**: Amber (#F5A623)
- **Project Development**: Teal (#22C55E)
- **Investors & Funds**: Blue (#00C2FF)
- **ESG & Compliance**: Green (#4ADE80)
- **Process & Timelines**: Slate (#8DA0B8)
- **About Helio Aegis**: Slate (#8DA0B8)

### Animations
- Accordion open/close: 350ms cubic-bezier(0.16,1,0.3,1)
- Chevron rotation: 200ms ease
- Hover effects: 200ms ease
- Tab transitions: 250ms ease

## Analytics Integration

### GTM Events

**FAQ Opened**
```javascript
{
  event: 'faq_opened',
  question_id: 'deal-sizes',
  category: 'finance'
}
```

**FAQ Feedback**
```javascript
{
  event: 'faq_feedback',
  question_id: 'deal-sizes',
  helpful: true/false
}
```

Events are fired via `window.dataLayer.push()` for GTM compatibility.

## SEO

### JSON-LD Schema
The `/faq` page automatically includes FAQPage schema with all questions and answers:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What deal sizes does Helio Aegis typically advise on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

This enables Google to display rich FAQ snippets in search results.

## Accessibility

- All accordion items use `<button>` with `aria-expanded` attribute
- Answer panels use `aria-hidden` when collapsed
- IDs referenced with `aria-controls` / `aria-labelledby`
- Tab strip uses `role="tablist"` / `role="tab"` / `aria-selected`
- Focus ring: 2px solid #F5A623 with 2px offset
- Color contrast: WCAG 2.1 AA compliant (4.5:1 minimum)
- Keyboard navigation: Tab, Enter/Space, Esc

## Responsive Behavior

### Desktop (1024px+)
- Full-width single-column accordion
- Tabs wrap naturally
- Optimal reading width (860px max)

### Tablet (768–1023px)
- Single-column accordion
- Tabs may wrap to 2 rows
- Adjusted spacing

### Mobile (<768px)
- Single column
- Horizontal scrolling tab strip
- Minimum 48px tap targets
- Reduced font sizes (14px questions, 13px answers)

## Customization

### Adding New Questions
Edit `components/FAQ/faqData.ts`:

```tsx
{
  id: 'unique-id',
  category: 'finance',
  question: 'Your question here?',
  answer: 'Your answer here (60-120 words).',
  keyData: { label: 'Key Metric', value: 'Value' },
  relatedIds: ['other-question-id'],
  cta: { text: 'Link text', href: '/path' },
}
```

### Updating Expert Contacts
Edit the `experts` object in `faqData.ts`:

```tsx
export const experts = {
  finance: {
    name: 'Name',
    role: 'Title',
    email: 'email@helioaegis.com',
  },
  // ...
};
```

### Changing Colors
Update category badge colors in `faqData.ts`:

```tsx
{
  id: 'finance',
  label: 'Energy Finance',
  badgeBg: '#3A2810',    // Background color
  badgeText: '#F5A623',  // Text color
}
```

## Performance

- Minimal re-renders with React hooks (useState, useMemo)
- Smooth animations using CSS transitions
- Lazy-loaded schema only on `/faq` page
- No external dependencies beyond Next.js and Framer Motion
- Optimized for Core Web Vitals

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Future Enhancements

- PDF export of FAQ
- Multi-language support
- Advanced filtering (multiple categories)
- FAQ analytics dashboard
- AI-powered question suggestions
- Video answers for complex topics
- Community Q&A integration

## Support

For questions or issues with the FAQ system, contact the development team or refer to the main project README.
