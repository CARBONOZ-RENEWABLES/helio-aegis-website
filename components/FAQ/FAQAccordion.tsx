'use client';

import { useState } from 'react';
import { FAQItem as FAQItemType, Category, faqItems } from './faqData';
import FAQItem from './FAQItem';

interface FAQAccordionProps {
  items: FAQItemType[];
  activeCategory: Category;
}

export default function FAQAccordion({ items, activeCategory }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredItems =
    activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
    // Fire GTM event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'faq_opened',
        question_id: id,
        category: activeCategory,
      });
    }
  };

  return (
    <div className="space-y-2">
      {filteredItems.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
