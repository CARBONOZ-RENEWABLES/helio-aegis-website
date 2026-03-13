'use client';

import { useState, useMemo } from 'react';
import { faqItems, FAQItem } from './faqData';

interface FAQSearchProps {
  onSearch: (results: FAQItem[]) => void;
}

export default function FAQSearch({ onSearch }: FAQSearchProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return faqItems;

    const lowerQuery = query.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(results);
  };

  return (
    <div className="w-full mb-12">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by topic, e.g. 'tax equity', 'GRESB', 'COD'"
          className="w-full px-6 py-4 bg-slate-dark border border-white/7 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-solar/40 transition-colors duration-200"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {query && results.length === 0 && (
        <div className="mt-6 p-6 bg-slate-dark border border-white/7 rounded-lg text-center">
          <p className="text-text-secondary mb-3">No results found for "{query}"</p>
          <a
            href="mailto:info@helioaegis.com"
            className="inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors"
          >
            <span>Contact us directly</span>
            <span>→</span>
          </a>
        </div>
      )}

      {query && results.length > 0 && (
        <p className="mt-4 text-sm text-text-muted">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
      )}
    </div>
  );
}
