'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    name: 'Mojave Solar Complex',
    location: 'California, USA',
    capacity: '250 MW',
    technology: 'Utility-Scale Solar',
    status: 'OPERATIONAL',
    cod: 'Q3 2023',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    description: 'Large-scale photovoltaic installation across 2,000 acres',
    stats: {
      generation: '450 GWh/year',
      homes: '45,000',
      co2: '350K tonnes/year',
    },
  },
  {
    id: 2,
    name: 'North Sea Wind Farm',
    location: 'North Sea, Europe',
    capacity: '450 MW',
    technology: 'Offshore Wind',
    status: 'CONSTRUCTION',
    cod: 'Q2 2025',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    description: 'Offshore wind installation with 75 turbines',
    stats: {
      generation: '1,200 GWh/year',
      homes: '120,000',
      co2: '950K tonnes/year',
    },
  },
  {
    id: 3,
    name: 'Green Battery Storage',
    location: 'Texas, USA',
    capacity: '200 MWh',
    technology: 'Battery Storage',
    status: 'DEVELOPMENT',
    cod: 'Q4 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    description: 'Advanced lithium-ion battery storage system',
    stats: {
      duration: '4 hours',
      cycles: '10,000+',
      efficiency: '92%',
    },
  },
  {
    id: 4,
    name: 'Hydrogen Hub MENA',
    location: 'Morocco',
    capacity: '100 MW',
    technology: 'Green Hydrogen',
    status: 'DEVELOPMENT',
    cod: 'Q1 2026',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    description: 'Green hydrogen production facility powered by renewables',
    stats: {
      production: '15 tonnes/day',
      purity: '99.99%',
      capacity: '100 MW',
    },
  },
];

const statusConfig = {
  OPERATIONAL: {
    bg: 'bg-growth/20',
    text: 'text-growth',
    border: 'border-growth/40',
    label: 'Operational',
  },
  CONSTRUCTION: {
    bg: 'bg-solar/20',
    text: 'text-solar',
    border: 'border-solar/40',
    label: 'Under Construction',
  },
  DEVELOPMENT: {
    bg: 'bg-hydrogen/20',
    text: 'text-hydrogen',
    border: 'border-hydrogen/40',
    label: 'In Development',
  },
};

export default function FeaturedProjects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="section-padding bg-void">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                Featured Projects
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-text-primary">
                Active Portfolio Highlights
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors font-semibold"
            >
              <span>View All Projects</span>
              <span>→</span>
            </Link>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl">
            Showcase of our most significant renewable energy projects across multiple
            technologies and geographies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col h-full"
            >
              {/* Card Container */}
              <div className="card overflow-hidden flex flex-col h-full hover:border-solar/40 transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-dark to-slate-mid">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />

                  {/* Status Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-sm text-xs font-semibold border ${
                      statusConfig[project.status as keyof typeof statusConfig].bg
                    } ${statusConfig[project.status as keyof typeof statusConfig].text} ${
                      statusConfig[project.status as keyof typeof statusConfig].border
                    }`}
                  >
                    {statusConfig[project.status as keyof typeof statusConfig].label}
                  </motion.div>

                  {/* Capacity Badge */}
                  <div className="absolute bottom-4 left-4 bg-void/80 backdrop-blur-sm border border-white/[0.08] rounded-sm px-3 py-2">
                    <p className="text-xs text-text-muted uppercase tracking-widest">
                      Capacity
                    </p>
                    <p className="font-display text-lg text-solar">{project.capacity}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  {/* Title & Location */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg text-text-primary group-hover:text-solar transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-solar font-mono">{project.location}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Technology & COD */}
                  <div className="space-y-3 py-4 border-t border-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted uppercase tracking-widest">
                        Technology
                      </span>
                      <span className="text-sm font-semibold text-text-secondary">
                        {project.technology}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted uppercase tracking-widest">
                        COD
                      </span>
                      <span className="text-sm font-semibold text-text-secondary">
                        {project.cod}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/[0.08]">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm font-display text-solar">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/portfolio/${project.id}`}
                    className="btn-secondary text-sm w-full mt-auto"
                  >
                    View Project Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 md:hidden"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-solar hover:text-solar-dim transition-colors font-semibold"
          >
            <span>View All Projects</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-white/[0.08]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                Total Capacity
              </p>
              <p className="font-display text-3xl text-solar">18.2 GW</p>
              <p className="text-sm text-text-secondary">Across all projects</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                Annual Generation
              </p>
              <p className="font-display text-3xl text-hydrogen">32 TWh</p>
              <p className="text-sm text-text-secondary">Clean energy produced</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                CO2 Avoided
              </p>
              <p className="font-display text-3xl text-growth">2.8M tonnes</p>
              <p className="text-sm text-text-secondary">Per year</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
