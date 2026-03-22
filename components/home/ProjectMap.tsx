'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/ui/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-slate-dark to-slate-mid rounded-sm flex items-center justify-center">
      <div className="text-center">
        <p className="text-text-muted">Loading map...</p>
      </div>
    </div>
  ),
});

const regions = ['All', 'Americas', 'EMEA', 'APAC'];
const technologies = ['All', 'Solar', 'Wind', 'Storage', 'H2'];

export default function ProjectMap() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="section-padding bg-slate-dark">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
              Global Project Presence
            </span>
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted uppercase tracking-widest self-center font-semibold">
                Region:
              </span>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
                    selectedRegion === region
                      ? 'bg-solar text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted uppercase tracking-widest self-center font-semibold">
                Technology:
              </span>
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
                    selectedTech === tech
                      ? 'bg-hydrogen text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <MapComponent region={selectedRegion} technology={selectedTech} />
        </motion.div>

        {/* Stats Below Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <div className="card p-8 text-center space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
              Total Projects
            </p>
            <p className="font-display text-4xl text-solar">340+</p>
            <p className="text-sm text-text-secondary">Across all regions</p>
          </div>
          <div className="card p-8 text-center space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
              Total Capacity
            </p>
            <p className="font-display text-4xl text-hydrogen">18.2 GW</p>
            <p className="text-sm text-text-secondary">Under management</p>
          </div>
          <div className="card p-8 text-center space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
              Active Countries
            </p>
            <p className="font-display text-4xl text-growth">34</p>
            <p className="text-sm text-text-secondary">Global footprint</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
