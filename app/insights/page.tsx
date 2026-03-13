'use client';

import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';

export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      type: 'Research',
      date: 'Jan 15, 2025',
      title: 'The 2025 Renewable Energy Finance Outlook',
      excerpt:
        'Capital deployment trends, interest rate impacts, and emerging opportunities in clean energy infrastructure.',
      readTime: '12 min read',
      featured: true,
      category: 'Market Analysis',
    },
    {
      id: 2,
      type: 'Commentary',
      date: 'Jan 12, 2025',
      title: 'IRA Extension: What It Means for Project Economics',
      excerpt:
        'Analysis of the extended Investment Tax Credit and its impact on utility-scale solar and wind returns.',
      readTime: '8 min read',
      category: 'Policy',
    },
    {
      id: 3,
      type: 'Report',
      date: 'Jan 10, 2025',
      title: 'Global Green Hydrogen Market Report',
      excerpt:
        'Comprehensive market sizing, cost curves, and investment opportunities in emerging hydrogen infrastructure.',
      readTime: '18 min read',
      category: 'Technology',
    },
    {
      id: 4,
      type: 'Commentary',
      date: 'Jan 8, 2025',
      title: 'European Grid Constraints: Opportunities for Storage',
      excerpt:
        'How transmission bottlenecks are creating attractive economics for battery storage deployment.',
      readTime: '10 min read',
      category: 'Market Analysis',
    },
    {
      id: 5,
      type: 'Research',
      date: 'Jan 5, 2025',
      title: 'Offshore Wind Cost Curve Evolution',
      excerpt:
        'Analyzing the trajectory of offshore wind capex and how it impacts project returns.',
      readTime: '14 min read',
      category: 'Technology',
    },
    {
      id: 6,
      type: 'Report',
      date: 'Dec 28, 2024',
      title: 'MENA Renewable Energy Investment Guide',
      excerpt:
        'Market overview, regulatory landscape, and investment opportunities across the Middle East and North Africa.',
      readTime: '20 min read',
      category: 'Regional',
    },
  ];

  const typeColors = {
    Research: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
    Commentary: 'bg-solar/20 text-solar border-solar/40',
    Report: 'bg-growth/20 text-growth border-growth/40',
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
              <span className="eyebrow">Insights</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight">
              <span className="text-text-primary">Intelligence for</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                Energy Markets
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Market research, policy analysis, and thought leadership from our team of
              renewable energy experts.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/30 to-void">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-8">
          <div className="flex flex-wrap gap-3">
            <span className="text-xs text-text-muted uppercase tracking-widest font-semibold self-center">
              Filter by:
            </span>
            {['All', 'Research', 'Commentary', 'Report'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200 bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`card p-6 flex flex-col space-y-4 group hover:border-solar/40 transition-all duration-300 ${
                  insight.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {/* Type Badge & Category */}
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex px-3 py-1 rounded-sm text-xs font-semibold border ${
                      typeColors[insight.type as keyof typeof typeColors]
                    }`}
                  >
                    {insight.type}
                  </div>
                  <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded-sm">
                    {insight.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-xs text-text-muted font-mono">{insight.date}</p>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl text-text-primary group-hover:text-solar transition-colors">
                  {insight.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary leading-relaxed flex-grow">
                  {insight.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <span className="text-xs text-text-muted">{insight.readTime}</span>
                  <Link
                    href={`/insights/${insight.id}`}
                    className="text-solar hover:text-solar-dim transition-colors font-semibold text-sm"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom max-w-2xl">
          <div className="card p-12 text-center space-y-6">
            <h2 className="font-display text-3xl text-text-primary">
              Stay Updated on Energy Markets
            </h2>
            <p className="text-lg text-text-secondary">
              Subscribe to our monthly newsletter for market insights, policy updates, and
              investment opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
              />
              <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-text-muted">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
