# FAQ System - Usage Examples

## Basic Usage

### Standalone FAQ Page
The FAQ is automatically available at `/faq` with full search, filtering, and schema.

```tsx
// app/faq/page.tsx (already created)
import FAQSection from '@/components/FAQ/FAQSection';

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <FAQSection category="all" showHeader={true} />
      <Footer />
    </>
  );
}
```

### Embedded on Homepage
```tsx
// app/page.tsx (already integrated)
import FAQSection from '@/components/FAQ/FAQSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <MarketTicker />
      {/* ... other sections ... */}
      <FAQSection category="all" showHeader={true} />
      <CTASection />
    </main>
  );
}
```

### Filtered by Category (No Header)
```tsx
// app/capabilities/page.tsx (already integrated)
import FAQSection from '@/components/FAQ/FAQSection';

export default function CapabilitiesPage() {
  return (
    <main>
      {/* ... capabilities content ... */}
      <FAQSection category="development" showHeader={false} />
      <Footer />
    </main>
  );
}
```

## Component-Level Usage

### Using Individual Components

```tsx
'use client';

import { useState } from 'react';
import FAQSearch from '@/components/FAQ/FAQSearch';
import FAQTabs from '@/components/FAQ/FAQTabs';
import FAQAccordion from '@/components/FAQ/FAQAccordion';
import { faqItems, Category } from '@/components/FAQ/faqData';

export default function CustomFAQ() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchResults, setSearchResults] = useState(faqItems);

  return (
    <section className="section-padding bg-void">
      <div className="container-custom max-w-3xl">
        <FAQSearch onSearch={setSearchResults} />
        <FAQTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <FAQAccordion items={searchResults} activeCategory={activeCategory} />
      </div>
    </section>
  );
}
```

## Data Access

### Accessing FAQ Data Directly

```tsx
import { faqItems, categories, experts } from '@/components/FAQ/faqData';

// Get all questions
console.log(faqItems); // Array of 27 FAQItem objects

// Get questions by category
const financeQuestions = faqItems.filter(q => q.category === 'finance');

// Get expert for a category
const financeExpert = experts.finance;
// { name: 'Sarah Chen', role: 'Head of Energy Finance', email: '...' }

// Get category metadata
const financeCategory = categories.find(c => c.id === 'finance');
// { id: 'finance', label: 'Energy Finance', badgeBg: '#3A2810', ... }
```

### Generating Schema Programmatically

```tsx
import { generateFAQSchema } from '@/components/FAQ/faqSchema';

const schema = generateFAQSchema();
// Returns FAQPage schema with all questions and answers
```

## Analytics Integration

### Tracking FAQ Interactions

The FAQ system automatically fires GTM events. Ensure your GTM container is active:

```tsx
// Event: FAQ Opened
{
  event: 'faq_opened',
  question_id: 'deal-sizes',
  category: 'finance'
}

// Event: FAQ Feedback
{
  event: 'faq_feedback',
  question_id: 'deal-sizes',
  helpful: true
}
```

### Custom Event Handling

```tsx
// In your GTM configuration, create triggers for:
// - Event name: faq_opened
// - Event name: faq_feedback

// Then create tags to track these events in Google Analytics
```

## Customization Examples

### Adding a New Question

```tsx
// In components/FAQ/faqData.ts

export const faqItems: FAQItem[] = [
  // ... existing questions ...
  {
    id: 'new-question-id',
    category: 'finance',
    question: 'What is your approach to risk management?',
    answer: 'We employ a multi-layered risk management framework that includes...',
    keyData: {
      label: 'Risk Framework',
      value: 'ISO 31000 Compliant'
    },
    relatedIds: ['deal-sizes', 'financing-structures'],
    cta: {
      text: 'Learn about our risk management',
      href: '/capabilities'
    }
  }
];
```

### Updating Expert Contact

```tsx
// In components/FAQ/faqData.ts

export const experts = {
  finance: {
    name: 'Your Name',
    role: 'Your Title',
    email: 'your.email@helioaegis.com',
  },
  // ... other experts ...
};
```

### Changing Category Colors

```tsx
// In components/FAQ/faqData.ts

export const categories = [
  {
    id: 'finance',
    label: 'Energy Finance',
    color: 'text-solar',
    badgeBg: '#3A2810',      // Change this
    badgeText: '#F5A623',    // And this
  },
  // ... other categories ...
];
```

## Advanced Patterns

### Filtering FAQ by Multiple Criteria

```tsx
'use client';

import { useState } from 'react';
import { faqItems, FAQItem } from '@/components/FAQ/faqData';

export default function AdvancedFAQFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);

  const filtered = faqItems.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.includes('all') || 
      selectedCategories.includes(item.category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Your custom filter UI */}
      {filtered.map(item => (
        <div key={item.id}>{item.question}</div>
      ))}
    </div>
  );
}
```

### Creating a FAQ Widget

```tsx
'use client';

import { useState } from 'react';
import FAQItem from '@/components/FAQ/FAQItem';
import { faqItems } from '@/components/FAQ/faqData';

interface FAQWidgetProps {
  categoryFilter?: string;
  maxItems?: number;
}

export default function FAQWidget({ categoryFilter, maxItems = 5 }: FAQWidgetProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const items = categoryFilter
    ? faqItems.filter(q => q.category === categoryFilter).slice(0, maxItems)
    : faqItems.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {items.map(item => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
```

### Exporting FAQ to JSON

```tsx
import { faqItems } from '@/components/FAQ/faqData';

export function exportFAQAsJSON() {
  const json = JSON.stringify(faqItems, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'faq.json';
  a.click();
}
```

## SEO Optimization

### Metadata for FAQ Page

```tsx
// app/faq/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Helio Aegis',
  description: 'Frequently asked questions about renewable energy finance, project development, investor relations, and ESG compliance.',
  keywords: 'FAQ, renewable energy, project finance, infrastructure investment, ESG',
  openGraph: {
    title: 'FAQ | Helio Aegis',
    description: 'Answers to your questions about renewable energy finance and project management.',
    url: 'https://helioaegis.com/faq',
    type: 'website',
  },
};
```

### Structured Data Validation

Test your schema at: https://schema.org/validator/

The FAQ system generates valid FAQPage schema automatically.

## Performance Tips

### Lazy Load FAQ on Demand

```tsx
import dynamic from 'next/dynamic';

const FAQSection = dynamic(() => import('@/components/FAQ/FAQSection'), {
  loading: () => <div>Loading FAQ...</div>,
});

export default function Page() {
  return <FAQSection category="all" showHeader={true} />;
}
```

### Memoize Filtered Results

```tsx
import { useMemo } from 'react';

const filteredItems = useMemo(() => {
  return faqItems.filter(item => 
    item.category === activeCategory
  );
}, [activeCategory]);
```

## Accessibility Testing

### Keyboard Navigation
- Tab: Move between items
- Enter/Space: Toggle accordion
- Esc: Close current item

### Screen Reader Testing
- Use NVDA (Windows) or VoiceOver (Mac)
- Verify aria-expanded states are announced
- Check that category badges are readable

### Color Contrast
- All text meets WCAG 2.1 AA (4.5:1 minimum)
- Test with: https://webaim.org/resources/contrastchecker/

## Troubleshooting

### FAQ Not Showing on Page
- Ensure `FAQSection` is imported correctly
- Check that `category` prop is valid
- Verify `showHeader` prop is set appropriately

### Search Not Working
- Check browser console for errors
- Ensure `onSearch` callback is properly connected
- Verify `faqItems` data is loaded

### Analytics Events Not Firing
- Confirm GTM container is active
- Check that `window.dataLayer` is available
- Verify event names match GTM configuration

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that color tokens are defined in `tailwind.config.js`
- Verify custom CSS classes are available

---

For more information, see `components/FAQ/README.md`
