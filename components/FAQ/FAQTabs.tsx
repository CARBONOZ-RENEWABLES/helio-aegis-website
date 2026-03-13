'use client';

import { categories, faqItems, Category } from './faqData';

interface FAQTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function FAQTabs({ activeCategory, onCategoryChange }: FAQTabsProps) {
  const getCategoryCount = (categoryId: Category) => {
    if (categoryId === 'all') return faqItems.length;
    return faqItems.filter((item) => item.category === categoryId).length;
  };

  return (
    <div className="mb-12 overflow-x-auto">
      <div className="flex gap-2 md:gap-4 pb-2 min-w-max md:min-w-0 md:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id as Category)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'text-solar border-b-2 border-solar'
                : 'text-text-secondary hover:text-text-primary border-b-2 border-transparent'
            }`}
          >
            {cat.label} <span className="text-text-muted">({getCategoryCount(cat.id as Category)})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
