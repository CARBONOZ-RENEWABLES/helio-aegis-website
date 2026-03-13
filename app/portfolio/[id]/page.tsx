'use client';

import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import Image from 'next/image';

const projectsData: Record<string, any> = {
  '1': {
    name: 'Mojave Solar Complex',
    location: 'California, USA',
    capacity: '250 MW',
    technology: 'Utility-Scale Solar',
    status: 'OPERATIONAL',
    cod: 'Q3 2023',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1200&h=600&fit=crop',
    description: 'Large-scale photovoltaic installation across 2,000 acres in the Mojave Desert.',
    fullDescription: `The Mojave Solar Complex represents one of the largest utility-scale solar installations in North America. 
    Spanning 2,000 acres, the facility features over 800,000 solar panels generating clean energy for over 45,000 homes annually.
    The project demonstrates our expertise in site selection, permitting, EPC management, and long-term asset optimization.`,
    stats: {
      capacity: '250 MW',
      generation: '450 GWh/year',
      homes: '45,000',
      co2: '350K tonnes/year',
      investment: '$180M',
      jobs: '250 (construction)',
    },
    timeline: [
      { phase: 'Site Selection', date: '2019', status: 'Completed' },
      { phase: 'Permitting', date: '2020', status: 'Completed' },
      { phase: 'Financing', date: '2021', status: 'Completed' },
      { phase: 'Construction', date: '2022', status: 'Completed' },
      { phase: 'COD', date: 'Q3 2023', status: 'Completed' },
      { phase: 'Operations', date: '2023-2043', status: 'Active' },
    ],
    team: [
      { role: 'Project Manager', name: 'John Smith' },
      { role: 'Finance Lead', name: 'Sarah Johnson' },
      { role: 'Technical Lead', name: 'Michael Chen' },
    ],
    partners: ['NextEra Energy', 'Goldman Sachs', 'Southern California Edison'],
  },
  '2': {
    name: 'North Sea Wind Farm',
    location: 'North Sea, Europe',
    capacity: '450 MW',
    technology: 'Offshore Wind',
    status: 'CONSTRUCTION',
    cod: 'Q2 2025',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=600&fit=crop',
    description: 'Offshore wind installation with 75 turbines in the North Sea.',
    fullDescription: `The North Sea Wind Farm is a flagship offshore wind project featuring 75 state-of-the-art turbines.
    Located in strategic waters with consistent wind patterns, the facility will generate clean energy for over 120,000 homes.
    This project showcases our expertise in offshore development, grid interconnection, and marine engineering.`,
    stats: {
      capacity: '450 MW',
      generation: '1,200 GWh/year',
      homes: '120,000',
      co2: '950K tonnes/year',
      investment: '$850M',
      jobs: '400 (construction)',
    },
    timeline: [
      { phase: 'Site Assessment', date: '2020', status: 'Completed' },
      { phase: 'Permitting', date: '2021', status: 'Completed' },
      { phase: 'Financing', date: '2022', status: 'Completed' },
      { phase: 'Construction', date: '2023-2025', status: 'Active' },
      { phase: 'COD', date: 'Q2 2025', status: 'Planned' },
      { phase: 'Operations', date: '2025-2045', status: 'Planned' },
    ],
    team: [
      { role: 'Project Manager', name: 'Emma Wilson' },
      { role: 'Finance Lead', name: 'David Brown' },
      { role: 'Technical Lead', name: 'Klaus Mueller' },
    ],
    partners: ['Ørsted', 'JP Morgan', 'Equinor'],
  },
  '3': {
    name: 'Green Battery Storage',
    location: 'Texas, USA',
    capacity: '200 MWh',
    technology: 'Battery Storage',
    status: 'DEVELOPMENT',
    cod: 'Q4 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    description: 'Advanced lithium-ion battery storage system.',
    fullDescription: `The Green Battery Storage facility represents cutting-edge energy storage technology.
    With 200 MWh capacity and 4-hour duration, it provides grid stabilization and peak shaving services.
    This project demonstrates our expertise in emerging storage technologies and grid services.`,
    stats: {
      capacity: '200 MWh',
      duration: '4 hours',
      cycles: '10,000+',
      efficiency: '92%',
      investment: '$120M',
      jobs: '80 (construction)',
    },
    timeline: [
      { phase: 'Development', date: '2023', status: 'Active' },
      { phase: 'Permitting', date: '2024', status: 'Active' },
      { phase: 'Financing', date: 'Q1 2025', status: 'Planned' },
      { phase: 'Construction', date: 'Q2-Q3 2025', status: 'Planned' },
      { phase: 'COD', date: 'Q4 2025', status: 'Planned' },
      { phase: 'Operations', date: '2025-2045', status: 'Planned' },
    ],
    team: [
      { role: 'Project Manager', name: 'Lisa Anderson' },
      { role: 'Finance Lead', name: 'Robert Taylor' },
      { role: 'Technical Lead', name: 'Jennifer Lee' },
    ],
    partners: ['Tesla Energy', 'Wells Fargo', 'ERCOT'],
  },
  '4': {
    name: 'Hydrogen Hub MENA',
    location: 'Morocco',
    capacity: '100 MW',
    technology: 'Green Hydrogen',
    status: 'DEVELOPMENT',
    cod: 'Q1 2026',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
    description: 'Green hydrogen production facility powered by renewables.',
    fullDescription: `The Hydrogen Hub MENA is a pioneering green hydrogen production facility.
    Powered by 100 MW of renewable energy, it produces 15 tonnes of hydrogen daily for industrial and transportation applications.
    This project positions us at the forefront of the emerging hydrogen economy.`,
    stats: {
      capacity: '100 MW',
      production: '15 tonnes/day',
      purity: '99.99%',
      applications: 'Industrial & Transport',
      investment: '$200M',
      jobs: '150 (construction)',
    },
    timeline: [
      { phase: 'Feasibility Study', date: '2023', status: 'Completed' },
      { phase: 'Development', date: '2024', status: 'Active' },
      { phase: 'Permitting', date: '2024-2025', status: 'Active' },
      { phase: 'Financing', date: 'Q3 2025', status: 'Planned' },
      { phase: 'Construction', date: 'Q4 2025-Q4 2025', status: 'Planned' },
      { phase: 'COD', date: 'Q1 2026', status: 'Planned' },
    ],
    team: [
      { role: 'Project Manager', name: 'Ahmed Hassan' },
      { role: 'Finance Lead', name: 'Fatima Al-Mansouri' },
      { role: 'Technical Lead', name: 'Dr. Hassan Al-Rashid' },
    ],
    partners: ['Siemens', 'ING', 'Morocco Energy Ministry'],
  },
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id];

  if (!project) {
    return (
      <main className="w-full bg-void">
        <Navigation />
        <section className="section-padding text-center">
          <div className="container-custom">
            <h1 className="font-display text-4xl text-text-primary mb-4">Project Not Found</h1>
            <p className="text-text-secondary mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/portfolio" className="btn-primary">
              Back to Portfolio
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom px-6 md:px-12 lg:px-20 pb-12 w-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Link href="/portfolio" className="text-solar hover:text-solar-dim">
                  Portfolio
                </Link>
                <span className="text-text-muted">/</span>
                <span className="text-text-secondary">{project.name}</span>
              </div>
              <h1 className="font-display text-5xl text-text-primary">{project.name}</h1>
              <p className="text-lg text-text-secondary">{project.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/30 to-void">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Capacity', value: project.capacity },
              { label: 'Technology', value: project.technology },
              { label: 'Status', value: project.status },
              { label: 'COD', value: project.cod },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-xs text-text-muted uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                <p className="font-display text-xl text-solar">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Description */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-3xl text-text-primary">Project Overview</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="card p-8 space-y-6">
                <h3 className="font-display text-2xl text-text-primary">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(project.stats).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <p className="text-xs text-text-muted uppercase tracking-widest mb-2">
                        {key}
                      </p>
                      <p className="font-display text-2xl text-solar">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl text-text-primary">Project Timeline</h3>
                <div className="space-y-3">
                  {project.timeline.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="card p-4 flex items-center justify-between hover:border-solar/40 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-solar rounded-full" />
                        <div>
                          <p className="font-semibold text-text-primary">{item.phase}</p>
                          <p className="text-sm text-text-muted">{item.date}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-sm ${
                          item.status === 'Completed'
                            ? 'bg-growth/20 text-growth'
                            : item.status === 'Active'
                              ? 'bg-solar/20 text-solar'
                              : 'bg-hydrogen/20 text-hydrogen'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Team */}
              <div className="card p-8 space-y-4">
                <h3 className="font-display text-xl text-text-primary">Project Team</h3>
                <div className="space-y-3">
                  {project.team.map((member: any, idx: number) => (
                    <div key={idx} className="pb-3 border-b border-white/[0.08] last:border-0 last:pb-0">
                      <p className="text-xs text-text-muted uppercase tracking-widest">
                        {member.role}
                      </p>
                      <p className="font-semibold text-text-primary">{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners */}
              <div className="card p-8 space-y-4">
                <h3 className="font-display text-xl text-text-primary">Key Partners</h3>
                <div className="space-y-2">
                  {project.partners.map((partner: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-solar">✓</span>
                      <span className="text-text-secondary">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="btn-primary w-full">Request More Information</button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <h2 className="font-display text-3xl text-text-primary mb-12">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(projectsData)
              .filter(([id]) => id !== params.id)
              .slice(0, 3)
              .map(([id, proj]) => (
                <Link
                  key={id}
                  href={`/portfolio/${id}`}
                  className="card p-6 hover:border-solar/40 transition-all group"
                >
                  <h3 className="font-display text-lg text-text-primary group-hover:text-solar transition-colors mb-2">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-solar font-mono mb-4">{proj.location}</p>
                  <p className="text-sm text-text-secondary">{proj.capacity}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
