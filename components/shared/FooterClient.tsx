'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function FooterClient({ data }: { data: any }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const logo = data.logo || { imageUrl: '/images/heliosngrlogo.png', altText: 'Helios NRG' };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-obsidian border-t border-solar/20">
      {/* Newsletter Section */}
      <div className="border-b border-white/[0.08]">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">
                {data.newsletter.headline}
              </h3>
              <p className="text-sm text-text-muted">
                {data.newsletter.subheadline}
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
                {subscribed ? data.newsletter.successMessage : data.newsletter.buttonText}
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
              <Image 
                src={logo.imageUrl} 
                alt={logo.altText} 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
              <span className="font-display text-lg">{data.brand.name}</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {data.brand.tagline}
            </p>
            <div className="flex items-center space-x-4">
              {data.brand.socialLinks.map((social: any, idx: number) => (
                <a
                  key={idx}
                  href={social.url}
                  className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/5 hover:bg-solar hover:text-void transition-all duration-200"
                  aria-label={social.platform}
                >
                  <span className="text-xs font-semibold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {data.linkColumns.map((column: any, idx: number) => (
            <div key={idx}>
              <h4 className="font-semibold text-text-primary mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link: any, lidx: number) => (
                  <li key={lidx}>
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
            <h4 className="font-semibold text-text-primary mb-4">{data.contact.title}</h4>
            <div className="space-y-4 text-sm text-text-muted">
              {data.contact.items.map((item: any, idx: number) => (
                <div key={idx}>
                  <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  {item.type === 'email' ? (
                    <a
                      href={`mailto:${item.value}`}
                      className="hover:text-text-secondary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : item.type === 'phone' ? (
                    <a
                      href={`tel:${item.value}`}
                      className="hover:text-text-secondary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-y border-white/[0.08]">
          {data.certifications.map((cert: any, idx: number) => (
            <div key={idx} className="flex items-center space-x-2 text-sm text-text-muted">
              <span>{cert.icon}</span>
              <span>{cert.label}</span>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-wrap gap-4 text-xs text-text-muted">
            {data.legal.links.map((link: any, idx: number) => (
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
            {data.legal.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
