'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Institution {
  shortName: string;
  fullName: string;
  logo?: string;
  order: number;
}

interface Certification {
  icon: string;
  label: string;
  order: number;
}

interface PartnersData {
  headline: string;
  institutions: Institution[];
  certifications: Certification[];
}

export default function PartnersCredentialsClient({ data }: { data: PartnersData }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Safety check
  if (!data || !data.institutions || !data.certifications) {
    return null;
  }

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
            {data.headline}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12"
        >
          {data.institutions.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 rounded-sm bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center">
                {partner.logo ? (
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <Image
                      src={partner.logo}
                      alt={partner.fullName}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                ) : (
                  <p className="font-mono text-xs font-semibold text-text-secondary group-hover:text-solar transition-colors">
                    {partner.shortName}
                  </p>
                )}
                <p className="text-xs text-text-muted mt-1 group-hover:text-text-secondary transition-colors">
                  {partner.fullName}
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
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-2xl">{cert.icon}</span>
              <span className="text-sm text-text-secondary font-semibold">{cert.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
