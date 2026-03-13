'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partners = [
  { name: 'Goldman Sachs', logo: 'GS' },
  { name: 'JP Morgan', logo: 'JPM' },
  { name: 'Wells Fargo', logo: 'WF' },
  { name: 'Rabobank', logo: 'RB' },
  { name: 'ING', logo: 'ING' },
  { name: 'MUFG', logo: 'MUFG' },
  { name: 'Brookfield', logo: 'BEP' },
  { name: 'Ørsted', logo: 'ORSTED' },
];

const certifications = [
  { name: 'ISO 14001', icon: '✓' },
  { name: 'GRESB 5-Star', icon: '⭐' },
  { name: 'UN PRI Signatory', icon: '🌍' },
];

export default function PartnersCredentials() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="section-padding bg-slate-dark">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-text-muted text-sm tracking-widest uppercase mb-4">
            Trusted by leading institutions
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12"
        >
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 rounded-sm bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                <p className="font-mono text-xs font-semibold text-text-secondary group-hover:text-solar transition-colors">
                  {partner.logo}
                </p>
                <p className="text-xs text-text-muted mt-1 group-hover:text-text-secondary transition-colors">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-white/[0.08]"
        >
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-2xl">{cert.icon}</span>
              <span className="text-sm text-text-secondary font-semibold">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
