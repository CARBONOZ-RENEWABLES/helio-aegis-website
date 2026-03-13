'use client';

import { Category, experts } from './faqData';

interface FAQExpertCalloutProps {
  category: Category;
}

export default function FAQExpertCallout({ category }: FAQExpertCalloutProps) {
  if (category === 'all') return null;

  const expert = experts[category as keyof typeof experts];
  if (!expert) return null;

  const handleContact = () => {
    const subject = `Question about ${category.replace('-', ' ')}`;
    window.location.href = `mailto:${expert.email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="mt-12 p-6 bg-slate-dark border border-white/7 rounded-lg">
      <p className="text-sm text-text-secondary mb-4">
        Have a more specific question? Our {category.replace('-', ' ')} team responds within 24 hours.
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-text-primary">{expert.name}</p>
          <p className="text-xs text-text-muted">{expert.role}</p>
        </div>
        <button
          onClick={handleContact}
          className="px-4 py-2 bg-solar text-void rounded font-semibold text-sm hover:bg-solar-dim transition-colors"
        >
          Send a message →
        </button>
      </div>
    </div>
  );
}
