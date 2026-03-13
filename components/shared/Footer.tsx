'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const footerLinks = {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    capabilities: [
      { label: 'Project Development', href: '/capabilities/project-development' },
      { label: 'Energy Finance', href: '/capabilities/energy-finance' },
      { label: 'Asset Management', href: '/capabilities/asset-management' },
      { label: 'Technology', href: '/capabilities/technology' },
    ],
    investors: [
      { label: 'Investment Thesis', href: '/investors' },
      { label: 'Fund Structures', href: '/investors#funds' },
      { label: 'Data Room', href: '/investors/data-room' },
      { label: 'Contact IR', href: '/contact?type=investor' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Legal Disclaimers', href: '/disclaimers' },
      { label: 'Cookie Settings', href: '#' },
    ],
  };

  return (
    <footer className="bg-obsidian border-t border-solar/20">
      {/* Newsletter Section */}
      <div className="border-b border-white/[0.08]">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">
                Stay current on energy markets.
              </h3>
              <p className="text-sm text-text-muted">
                Monthly insights, market data, and policy updates.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-solar rounded-sm flex items-center justify-center">
                <span className="text-void font-display font-bold">H</span>
              </div>
              <span className="font-display text-lg">Helio Aegis</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Structuring the clean energy future through integrated project management
              and energy finance.
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: 'in', label: 'LinkedIn' },
                { icon: 'tw', label: 'Twitter' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/5 hover:bg-solar hover:text-void transition-all duration-200"
                  aria-label={social.label}
                >
                  <span className="text-xs font-semibold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).slice(0, 3).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-text-primary mb-4 capitalize">
                {category === 'investors' ? 'Investors' : category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
            <div className="space-y-4 text-sm text-text-muted">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                  General
                </p>
                <a
                  href="mailto:info@helioaegis.com"
                  className="hover:text-text-secondary transition-colors"
                >
                  info@helioaegis.com
                </a>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                  Investors
                </p>
                <a
                  href="mailto:investors@helioaegis.com"
                  className="hover:text-text-secondary transition-colors"
                >
                  investors@helioaegis.com
                </a>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                  Phone
                </p>
                <a
                  href="tel:+1-555-0123"
                  className="hover:text-text-secondary transition-colors"
                >
                  +1 (555) 0123
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-y border-white/[0.08]">
          {[
            { icon: '✓', label: 'ISO 14001' },
            { icon: '⭐', label: 'GRESB 5-Star' },
            { icon: '🌍', label: 'UN PRI' },
            { icon: '📋', label: 'TCFD Aligned' },
          ].map((cert, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm text-text-muted">
              <span>{cert.icon}</span>
              <span>{cert.label}</span>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-wrap gap-4 text-xs text-text-muted">
            {footerLinks.legal.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            © 2025 Helio Aegis Capital Partners LLC. All rights reserved. Past performance
            is not indicative of future results. This website is for informational purposes
            only and does not constitute an offer to sell or solicitation of an offer to buy
            any securities.
          </p>
        </div>
      </div>
    </footer>
  );
}
