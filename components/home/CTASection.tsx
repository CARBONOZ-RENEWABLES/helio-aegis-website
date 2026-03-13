'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-solar/10 via-void to-void" />
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-solar rounded-full opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-text-primary">
            Ready to deploy capital in the energy transition?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Our team works with institutional investors, project developers, and government
            entities to structure and execute transformational renewable infrastructure deals.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <button className="btn-primary">Schedule a Meeting →</button>
            <button className="btn-secondary">Download Investment Deck ↓</button>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-8 border-t border-white/[0.08]"
          >
            {[
              '✓ Typically responds within 24 hours',
              '✓ NDA available upon request',
              '✓ Strict confidentiality',
            ].map((signal, idx) => (
              <p key={idx} className="text-sm text-text-secondary">
                {signal}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
