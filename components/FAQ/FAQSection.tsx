'use client';

import { useState, useMemo } from 'react';
import { Category, faqItems, FAQItem as FAQItemType } from './faqData';
import FAQSearch from './FAQSearch';
import FAQTabs from './FAQTabs';
import FAQAccordion from './FAQAccordion';
import FAQExpertCallout from './FAQExpertCallout';

interface FAQSectionProps {
  category?: Category;
  showHeader?: boolean;
}

export default function FAQSection({ category = 'all', showHeader = true }: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(category);
  const [searchResults, setSearchResults] = useState<FAQItemType[]>(faqItems);

  const displayItems = useMemo(() => {
    if (activeCategory === 'all') return searchResults;
    return searchResults.filter((item) => item.category === activeCategory);
  }, [searchResults, activeCategory]);

  return (
    <section className="section-padding bg-void">
      <div className="container-custom max-w-3xl">
        {showHeader && (
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
              Answers for serious inquiries.
            </h1>
            <p className="text-lg text-text-secondary">
              If your question is not here, our team typically responds within 24 hours.
            </p>
          </div>
        )}

        <FAQSearch onSearch={setSearchResults} />
        <FAQTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <FAQAccordion items={displayItems} activeCategory={activeCategory} />
        <FAQExpertCallout category={activeCategory} />
      </div>
    </section>
  );
}
