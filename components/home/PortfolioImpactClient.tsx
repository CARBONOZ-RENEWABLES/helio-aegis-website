'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from '@/components/ui/CountUp';

export default function PortfolioImpactClient({ data }: any) {
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
          <h2>
            <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
              {data?.sectionTitle || 'Scale built on executed deals.'}
            </span>
          </h2>
          <p className="subheadline text-text-secondary max-w-2xl mx-auto">
            {data?.sectionSubtitle || 'Since 2012, Helio Aegis has structured and delivered:'}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8"
        >
          {data?.metrics?.map((metric: any, idx: number) => (
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
