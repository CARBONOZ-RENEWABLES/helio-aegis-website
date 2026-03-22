'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', inquiryType: 'general', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="card p-12 space-y-8">
      <div>
        <h2 className="font-display text-3xl text-text-primary mb-2">Send us a Message</h2>
        <p className="text-text-secondary">
          We typically respond within 24 hours. All inquiries are handled with strict
          confidentiality.
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
            placeholder="Your company"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Inquiry Type *
          </label>
          <select
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary focus:outline-none focus:border-solar transition-colors"
          >
            <option value="general">General Inquiry</option>
            <option value="investor">Investor Relations</option>
            <option value="developer">Project Developer</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Message *
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            I agree to the privacy policy and understand that my information will be
            handled with strict confidentiality. I consent to being contacted about my
            inquiry.
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={submitted}
        >
          {submitted ? '✓ Message Sent' : 'Send Message'}
        </button>

        <p className="text-xs text-text-muted text-center">
          We typically respond within 24 hours. NDA available upon request.
        </p>
      </form>
    </div>
  );
}
