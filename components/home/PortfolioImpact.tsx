'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from '@/components/ui/CountUp';

const metrics = [
  { value: 12.4, suffix: 'B', prefix: '$', label: 'Capital Deployed' },
  { value: 18.2, suffix: ' GW', label: 'Capacity Managed' },
  { value: 340, suffix: '+', label: 'Projects Closed' },
  { value: 2.8, suffix: 'M', label: 'Homes Powered' },
  { value: 96, suffix: '%', label: 'On-Time Delivery' },
];

export default function PortfolioImpact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-b from-void to-slate-dark relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 grid-texture opacity-10" />
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-solar rounded-full opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
            Scale built on executed deals.
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Since 2012, Helio Aegis has structured and delivered:
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8"
        >
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="metric-value mb-2">
                <CountUp
                  end={metric.value}
                  decimals={metric.value < 100 ? 1 : 0}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
