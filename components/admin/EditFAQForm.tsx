'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { value: 'finance', label: 'Energy Finance' },
  { value: 'development', label: 'Project Development' },
  { value: 'investors', label: 'Investors & Funds' },
  { value: 'esg', label: 'ESG & Compliance' },
  { value: 'process', label: 'Process & Timelines' },
  { value: 'about', label: 'About Helios NRG' }
];

export default function EditFAQForm({ faq }: { faq?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'finance',
    keyDataLabel: faq?.keyData?.label || '',
    keyDataValue: faq?.keyData?.value || '',
    ctaText: faq?.cta?.text || '',
    ctaHref: faq?.cta?.href || '',
    status: faq?.status || 'published'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      keyData: formData.keyDataLabel && formData.keyDataValue ? {
        label: formData.keyDataLabel,
        value: formData.keyDataValue
      } : undefined,
      cta: formData.ctaText && formData.ctaHref ? {
        text: formData.ctaText,
        href: formData.ctaHref
      } : undefined,
      status: formData.status
    };

    const url = faq ? `/api/faq/${faq._id}` : '/api/faq';
    const method = faq ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/faq');
      router.refresh();
    } else {
      alert('Failed to save FAQ');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            required
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Question</label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Answer</label>
          <textarea
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Optional: Key Data Badge</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Label</label>
            <input
              type="text"
              value={formData.keyDataLabel}
              onChange={(e) => setFormData({ ...formData, keyDataLabel: e.target.value })}
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
              placeholder="Deal Range"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Value</label>
            <input
              type="text"
              value={formData.keyDataValue}
              onChange={(e) => setFormData({ ...formData, keyDataValue: e.target.value })}
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
              placeholder="$50M–$2B+"
            />
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Optional: Call to Action</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">CTA Text</label>
            <input
              type="text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
              placeholder="Learn more"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">CTA Link</label>
            <input
              type="text"
              value={formData.ctaHref}
              onChange={(e) => setFormData({ ...formData, ctaHref: e.target.value })}
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
              placeholder="/capabilities"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? 'Saving...' : faq ? 'Update FAQ' : 'Create FAQ'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
