'use client';

import { useState } from 'react';

interface FormData {
  headline: string;
  subheadline: string;
  responseTime: string;
  privacyText: string;
  submitButtonText: string;
  successMessage: string;
  inquiryTypes: Array<{
    value: string;
    label: string;
  }>;
}

export default function ContactFormClient({ formData }: { formData: FormData }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: formData.inquiryTypes[0]?.value || 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', company: '', inquiryType: formData.inquiryTypes[0]?.value || 'general', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="card p-12 space-y-8">
      <div>
        <h2 className="font-display text-3xl text-text-primary mb-2">{formData.headline}</h2>
        <p className="text-text-secondary">
          {formData.subheadline}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
            placeholder="Your company"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Inquiry Type *
          </label>
          <select
            value={form.inquiryType}
            onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary focus:outline-none focus:border-solar transition-colors"
          >
            {formData.inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Message *
          </label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors resize-none"
            placeholder="Tell us about your inquiry..."
          />
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="privacy"
            required
            className="mt-1"
          />
          <label htmlFor="privacy" className="text-xs text-text-muted leading-relaxed">
            {formData.privacyText}
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={submitted}
        >
          {submitted ? formData.successMessage : formData.submitButtonText}
        </button>

        <p className="text-xs text-text-muted text-center">
          {formData.responseTime}
        </p>
      </form>
    </div>
  );
}
