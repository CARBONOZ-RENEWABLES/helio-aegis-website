'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQItem, categories, faqItems } from './faqData';

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null);

  const categoryConfig = categories.find((c) => c.id === item.category);
  const relatedQuestions = item.relatedIds
    ? faqItems.filter((q) => item.relatedIds?.includes(q.id))
    : faqItems.filter((q) => q.category === item.category && q.id !== item.id).slice(0, 2);

  const handleFeedback = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    // Fire GTM event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'faq_feedback',
        question_id: item.id,
        helpful: isHelpful,
      });
    }
  };

  return (
    <div
      className={`border border-white/7 rounded-lg transition-all duration-300 ${
        isOpen ? 'bg-slate-dark border-solar/40' : 'bg-obsidian hover:border-white/12'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 flex items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {categoryConfig && (
              <span
                className="px-2 py-1 rounded text-xs font-mono uppercase tracking-wider"
                style={{
                  backgroundColor: categoryConfig.badgeBg,
                  color: categoryConfig.badgeText,
                }}
              >
                {categoryConfig.label}
              </span>
            )}
          </div>
          <h3 className="text-base md:text-lg font-medium text-text-primary leading-tight">{item.question}</h3>
        </div>
        <div
          className={`flex-shrink-0 w-5 h-5 text-solar transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div id={`faq-answer-${item.id}`} className="px-6 pb-6 border-t border-white/7 pt-6 space-y-6">
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">{item.answer}</p>

          {item.keyData && (
            <div className="p-4 bg-obsidian border-l-4 border-solar rounded">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{item.keyData.label}</p>
              <p className="text-base font-mono text-solar">{item.keyData.value}</p>
            </div>
          )}

          {relatedQuestions.length > 0 && (
            <div className="pt-4 border-t border-white/7">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3">You might also ask:</p>
              <ul className="space-y-2">
                {relatedQuestions.map((q) => (
                  <li key={q.id}>
                    <button
                      onClick={onToggle}
                      className="text-sm text-solar hover:text-solar-dim transition-colors text-left"
                    >
                      {q.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.cta && (
            <Link href={item.cta.href} className="inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors text-sm font-semibold">
              <span>{item.cta.text}</span>
              <span>→</span>
            </Link>
          )}

          <div className="pt-4 border-t border-white/7 flex items-center gap-4">
            <span className="text-xs text-text-muted">Was this helpful?</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleFeedback(true)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  helpful === true
                    ? 'bg-growth text-void'
                    : 'bg-slate-mid text-text-secondary hover:bg-slate-light'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  helpful === false
                    ? 'bg-alert text-void'
                    : 'bg-slate-mid text-text-secondary hover:bg-slate-light'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
