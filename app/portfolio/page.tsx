'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import Image from 'next/image';

const allProjects = [
  {
    id: 1,
    name: 'Mojave Solar Complex',
    location: 'California, USA',
    capacity: 250,
    technology: 'Solar',
    status: 'OPERATIONAL',
    cod: 'Q3 2023',
    region: 'Americas',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'North Sea Wind Farm',
    location: 'North Sea, Europe',
    capacity: 450,
    technology: 'Wind',
    status: 'CONSTRUCTION',
    cod: 'Q2 2025',
    region: 'EMEA',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Green Battery Storage',
    location: 'Texas, USA',
    capacity: 200,
    technology: 'Storage',
    status: 'DEVELOPMENT',
    cod: 'Q4 2025',
    region: 'Americas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'Hydrogen Hub MENA',
    location: 'Morocco',
    capacity: 100,
    technology: 'H2',
    status: 'DEVELOPMENT',
    cod: 'Q1 2026',
    region: 'EMEA',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    name: 'Tokyo Solar Park',
    location: 'Tokyo, Japan',
    capacity: 180,
    technology: 'Solar',
    status: 'OPERATIONAL',
    cod: 'Q1 2023',
    region: 'APAC',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    name: 'Australian Wind Complex',
    location: 'Victoria, Australia',
    capacity: 320,
    technology: 'Wind',
    status: 'CONSTRUCTION',
    cod: 'Q3 2025',
    region: 'APAC',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
  },
];

const statusColors = {
  OPERATIONAL: 'bg-growth/20 text-growth border-growth/40',
  CONSTRUCTION: 'bg-solar/20 text-solar border-solar/40',
  DEVELOPMENT: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
};

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredProjects = allProjects.filter((project) => {
    const techMatch = selectedTech === 'All' || project.technology === selectedTech;
    const regionMatch = selectedRegion === 'All' || project.region === selectedRegion;
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
    return techMatch && regionMatch && statusMatch;
  });

  const technologies = ['All', ...new Set(allProjects.map((p) => p.technology))];
  const regions = ['All', ...new Set(allProjects.map((p) => p.region))];
  const statuses = ['All', ...new Set(allProjects.map((p) => p.status))];

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-slate-dark to-void">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="eyebrow">Portfolio</div>
            <h1 className="font-display text-4xl md:text-5xl text-text-primary">
              Our Global Project Portfolio
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              {filteredProjects.length} projects across {new Set(filteredProjects.map((p) => p.region)).size} regions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-18 z-40 bg-void/95 backdrop-blur-sm border-b border-white/[0.08] px-6 md:px-12 lg:px-20 py-6">
        <div className="container-custom space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted uppercase tracking-widest self-center">
                Technology:
              </span>
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                    selectedTech === tech
                      ? 'bg-solar text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted uppercase tracking-widest self-center">
                Region:
              </span>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                    selectedRegion === region
                      ? 'bg-hydrogen text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted uppercase tracking-widest self-center">
                Status:
              </span>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                    selectedStatus === status
                      ? 'bg-growth text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-solar text-void'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-solar text-void'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {viewMode === 'grid' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="card overflow-hidden group flex flex-col h-full"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-dark to-slate-mid overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-sm text-xs font-semibold border ${
                        statusColors[project.status as keyof typeof statusColors]
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div>
                      <h3 className="font-display text-lg text-text-primary mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-solar font-mono">{project.location}</p>
                    </div>
                    <div className="border-t border-white/[0.08] pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">{project.capacity} MW</span>
                        <span className="text-text-secondary font-semibold">
                          {project.technology}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">COD: {project.cod}</p>
                    </div>
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="btn-ghost text-sm mt-auto"
                    >
                      View Project →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 overflow-x-auto"
            >
              <div className="space-y-3">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.id}`}
                    className="card overflow-hidden group flex items-center gap-6 hover:border-solar/40 transition-all"
                  >
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="128px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-40" />
                    </div>
                    <div className="flex-grow p-4 space-y-2">
                      <h3 className="font-display text-lg text-text-primary group-hover:text-solar transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-solar font-mono">{project.location}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-text-secondary">{project.capacity} MW</span>
                        <span className="text-text-secondary font-semibold">{project.technology}</span>
                        <span
                          className={`px-2 py-1 rounded-sm text-xs font-semibold border ${
                            statusColors[project.status as keyof typeof statusColors]
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="text-text-muted">COD: {project.cod}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
