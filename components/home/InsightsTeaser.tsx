'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const insights = [
  {
    id: 1,
    type: 'Research',
    date: 'Jan 15, 2025',
    title: 'The 2025 Renewable Energy Finance Outlook',
    excerpt: 'Capital deployment trends, interest rate impacts, and emerging opportunities in clean energy infrastructure.',
    readTime: '12 min read',
    featured: true,
  },
  {
    id: 2,
    type: 'Commentary',
    date: 'Jan 12, 2025',
    title: 'IRA Extension: What It Means for Project Economics',
    excerpt: 'Analysis of the extended Investment Tax Credit and its impact on utility-scale solar and wind returns.',
    readTime: '8 min read',
  },
  {
    id: 3,
    type: 'Report',
    date: 'Jan 10, 2025',
    title: 'Global Green Hydrogen Market Report',
    excerpt: 'Comprehensive market sizing, cost curves, and investment opportunities in emerging hydrogen infrastructure.',
    readTime: '18 min read',
  },
];

const typeColors = {
  Research: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
  Commentary: 'bg-solar/20 text-solar border-solar/40',
  Report: 'bg-growth/20 text-growth border-growth/40',
};

export default function InsightsTeaser() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="section-padding bg-void">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
            Intelligence for Energy Markets
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Market research, policy analysis, and thought leadership from our team.
          </p>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`card p-6 flex flex-col space-y-4 group hover:border-solar/40 transition-all duration-300 ${
                insight.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              {/* Type Badge */}
              <div
                className={`inline-flex w-fit px-3 py-1 rounded-sm text-xs font-semibold border ${
                  typeColors[insight.type as keyof typeof typeColors]
                }`}
              >
                {insight.type}
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
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/insights"
            className="inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors font-semibold"
          >
            <span>View All Insights</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
