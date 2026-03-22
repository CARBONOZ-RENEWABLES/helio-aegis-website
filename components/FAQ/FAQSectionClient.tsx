'use client';

import { useState, useMemo } from 'react';
import FAQSearch from './FAQSearch';
import FAQTabs from './FAQTabs';
import FAQAccordion from './FAQAccordion';
import FAQExpertCallout from './FAQExpertCallout';

type Category = 'all' | 'finance' | 'development' | 'investors' | 'esg' | 'process' | 'about';

interface FAQSectionClientProps {
  faqs: any[];
  category?: string;
  showHeader?: boolean;
}

export default function FAQSectionClient({ faqs, category = 'all', showHeader = true }: FAQSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(category as Category);
  const [searchResults, setSearchResults] = useState(faqs);

  const displayItems = useMemo(() => {
    if (activeCategory === 'all') return searchResults;
    return searchResults.filter((item: any) => item.category === activeCategory);
  }, [searchResults, activeCategory]);

  return (
    <section className="section-padding bg-void">
      <div className="container-custom max-w-3xl">
        {showHeader && (
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
                Answers for serious inquiries.
              </span>
            </h1>
            <p className="text-lg text-text-secondary">
              If your question is not here, our team typically responds within 24 hours.
            </p>
          </div>
        )}

        <FAQSearch faqs={faqs} onSearch={setSearchResults} />
        <FAQTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <FAQAccordion items={displayItems} activeCategory={activeCategory} />
        <FAQExpertCallout category={activeCategory} />
      </div>
    </section>
  );
}
