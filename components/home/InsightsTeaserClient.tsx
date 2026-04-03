'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface Insight {
  id: string;
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured: boolean;
}

const typeColors: Record<string, string> = {
  Research: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
  Commentary: 'bg-solar/20 text-solar border-solar/40',
  Report: 'bg-growth/20 text-growth border-growth/40',
};

export default function InsightsTeaserClient({ insights }: { insights: Insight[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (insights.length === 0) {
    return null;
  }

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
          <h2 className="mb-4">
            <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
              Intelligence for Energy Markets
            </span>
          </h2>
          <p className="subheadline text-text-secondary max-w-2xl mx-auto">
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
                  typeColors[insight.type] || typeColors.Research
                }`}
              >
                {insight.type}
              </div>

              {/* Date */}
              <p className="text-xs text-text-muted font-mono">{insight.date}</p>

              {/* Title */}
              <h3>
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
                  href={`/insights/${insight.slug}`}
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
