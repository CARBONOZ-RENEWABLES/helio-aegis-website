'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function CapabilitiesClient({ data }: any) {
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
            <h2>
              <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent whitespace-pre-line">
                {data.sectionTitle}
              </span>
            </h2>
            <p className="subheadline text-text-secondary leading-relaxed">
              {data.sectionDescription}
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
            {data.capabilities.map((cap: any, idx: number) => (
              <div
                key={idx}
                className="card p-8 flex flex-col space-y-4 group cursor-pointer hover:border-solar/40 transition-all duration-300"
              >
                <div className="text-4xl">{cap.icon}</div>
                <h3>
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
