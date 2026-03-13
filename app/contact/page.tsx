'use client';

import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import { useState } from 'react';

export default function ContactPage() {
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
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar rounded-full opacity-5 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">Contact</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight">
              <span className="text-text-primary">Get in</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Whether you&apos;re an institutional investor, project developer, or government
              agency, we&apos;d like to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'General Inquiries',
                email: 'info@helioaegis.com',
                phone: '+1 (212) 555-0100',
                description: 'Questions about our services and capabilities',
              },
              {
                title: 'Investor Relations',
                email: 'investors@helioaegis.com',
                phone: '+1 (212) 555-0101',
                description: 'Fund information and investment opportunities',
              },
              {
                title: 'Project Submissions',
                email: 'projects@helioaegis.com',
                phone: '+1 (212) 555-0102',
                description: 'Project development and partnership opportunities',
              },
            ].map((contact, idx) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3 className="font-display text-xl text-text-primary">{contact.title}</h3>
                <p className="text-sm text-text-secondary">{contact.description}</p>
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-solar hover:text-solar-dim transition-colors font-semibold"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-solar hover:text-solar-dim transition-colors font-semibold"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom max-w-2xl">
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
        </div>
      </section>

      {/* Global Offices */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-12">
            Global Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'North America',
                office: 'New York, USA',
                address: '123 Park Avenue, New York, NY 10017',
                phone: '+1 (212) 555-0100',
                timezone: 'EST',
              },
              {
                region: 'Europe',
                office: 'London, UK',
                address: '456 Canary Wharf, London, E14 5AB',
                phone: '+44 (20) 7946 0958',
                timezone: 'GMT',
              },
              {
                region: 'MENA',
                office: 'Dubai, UAE',
                address: '789 DIFC, Dubai, UAE',
                phone: '+971 (4) 362 1111',
                timezone: 'GST',
              },
            ].map((office, idx) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3 className="font-display text-xl text-text-primary">{office.region}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Office
                    </p>
                    <p className="text-text-secondary font-semibold">{office.office}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <p className="text-text-secondary">{office.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${office.phone}`}
                      className="text-solar hover:text-solar-dim transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Timezone
                    </p>
                    <p className="text-text-secondary">{office.timezone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
