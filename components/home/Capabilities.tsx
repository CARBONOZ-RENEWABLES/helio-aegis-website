'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const capabilities = [
  {
    title: 'Project Development',
    icon: '📋',
    description: 'From origination to COD, we manage the full lifecycle of complex renewable projects.',
    href: '/capabilities/project-development',
  },
  {
    title: 'Energy Finance',
    icon: '📊',
    description: 'Structuring deals from $50M to $2B+ across all vehicle types and capital sources.',
    href: '/capabilities/energy-finance',
  },
  {
    title: 'Asset Management',
    icon: '🔗',
    description: 'Post-COD portfolio optimization and performance management for stabilized assets.',
    href: '/capabilities/asset-management',
  },
  {
    title: 'Technology',
    icon: '⚡',
    description: 'Agnostic across Solar, Wind, BESS, and Green Hydrogen platforms.',
    href: '/capabilities/technology',
  },
];

export default function Capabilities() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-padding bg-void relative" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="eyebrow">What We Do</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-primary">
              Two Disciplines.
              <br />
              One Platform.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our integrated project management and energy finance model creates superior
              risk-adjusted returns for institutional capital. We combine deep sector expertise
              with proprietary technology to execute complex transactions at scale.
            </p>
            <Link
              href="/capabilities"
              className="inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors duration-200 font-semibold"
            >
              <span>View All Capabilities</span>
              <span>→</span>
            </Link>
          </motion.div>

          {/* Right Column - Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="card p-8 flex flex-col space-y-4 group cursor-pointer hover:border-solar/40 transition-all duration-300"
              >
                <div className="text-4xl">{cap.icon}</div>
                <h3 className="font-display text-xl text-text-primary group-hover:text-solar transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                  {cap.description}
                </p>
                <Link
                  href={cap.href}
                  className="inline-flex items-center space-x-1 text-solar text-sm font-semibold hover:text-solar-dim transition-colors"
                >
                  <span>Explore</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
