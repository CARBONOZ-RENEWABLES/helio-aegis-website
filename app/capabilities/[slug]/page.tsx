import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const capabilitiesData: any = {
  'project-development': {
    title: 'Project Development',
    icon: '📋',
    description: 'From site selection to commercial operation, we manage the full lifecycle of complex renewable projects.',
    hero: 'End-to-end project development expertise across all renewable technologies and geographies.',
    services: [
      { name: 'Site Selection & Origination', description: 'Proprietary deal sourcing and site evaluation across target markets.' },
      { name: 'Feasibility & Engineering', description: 'Technical and economic feasibility studies with third-party validation.' },
      { name: 'Permitting & Regulatory', description: 'Comprehensive permitting strategy and regulatory compliance management.' },
      { name: 'Grid Interconnection', description: 'Interconnection queue management and utility coordination.' },
      { name: 'EPC Management', description: 'Contractor selection, contract negotiation, and construction oversight.' },
      { name: 'Construction Oversight', description: 'On-site project management and quality assurance.' }
    ],
    stats: [
      { label: 'Projects Developed', value: '340+' },
      { label: 'Capacity Managed', value: '18.2 GW' },
      { label: 'Avg Development Time', value: '24-36 months' }
    ]
  },
  'energy-finance': {
    title: 'Energy Finance',
    icon: '📊',
    description: 'Structuring and executing complex capital transactions across all vehicle types and geographies.',
    hero: 'Sophisticated financing solutions for renewable infrastructure at institutional scale.',
    services: [
      { name: 'Project Finance Structuring', description: 'Non-recourse project finance with optimized capital structures.' },
      { name: 'Tax Equity & ITC Monetization', description: 'Partnership flip and inverted lease structures for tax credit monetization.' },
      { name: 'Construction Financing', description: 'Bridge financing and construction debt facilities.' },
      { name: 'M&A Advisory', description: 'Buy-side and sell-side advisory for portfolio transactions.' },
      { name: 'Green Bonds', description: 'Public and private green bond issuances.' },
      { name: 'Fund Structures', description: 'Closed-end and open-end fund formation and management.' }
    ],
    stats: [
      { label: 'Capital Deployed', value: '$12.4B' },
      { label: 'Avg Deal Size', value: '$150-500M' },
      { label: 'Financing Partners', value: '40+' }
    ]
  },
  'asset-management': {
    title: 'Asset Management',
    icon: '🔗',
    description: 'Post-COD portfolio optimization and performance management for stabilized renewable assets.',
    hero: 'Maximizing value from operating renewable energy portfolios.',
    services: [
      { name: 'Portfolio Optimization', description: 'Strategic portfolio management and value creation initiatives.' },
      { name: 'Performance Monitoring', description: 'Real-time monitoring and performance analytics.' },
      { name: 'Operations Management', description: 'O&M oversight and vendor management.' },
      { name: 'Refinancing Advisory', description: 'Opportunistic refinancing and capital structure optimization.' },
      { name: 'Exit Strategy', description: 'Portfolio sale preparation and execution.' },
      { name: 'Investor Reporting', description: 'Comprehensive reporting and investor relations.' }
    ],
    stats: [
      { label: 'Assets Under Management', value: '$8.5B' },
      { label: 'Portfolio Companies', value: '120+' },
      { label: 'Avg Asset Age', value: '5-15 years' }
    ]
  },
  'technology': {
    title: 'Technology',
    icon: '⚡',
    description: 'Agnostic expertise across all renewable energy technologies and emerging platforms.',
    hero: 'Technology-agnostic approach with deep expertise across all renewable platforms.',
    services: [
      { name: 'Utility-Scale Solar', description: 'Large-scale PV development and financing.' },
      { name: 'Onshore Wind', description: 'Land-based wind project development and execution.' },
      { name: 'Offshore Wind', description: 'Fixed and floating offshore wind platforms.' },
      { name: 'Battery Storage (BESS)', description: 'Standalone and co-located energy storage systems.' },
      { name: 'Green Hydrogen', description: 'Electrolysis and hydrogen infrastructure development.' },
      { name: 'Hybrid Systems', description: 'Solar + storage and wind + storage hybrid projects.' }
    ],
    stats: [
      { label: 'Solar Capacity', value: '8.2 GW' },
      { label: 'Wind Capacity', value: '7.5 GW' },
      { label: 'Storage Capacity', value: '2.5 GWh' }
    ]
  }
};

export default function CapabilityDetailPage({ params }: { params: { slug: string } }) {
  const capability = capabilitiesData[params.slug];

  if (!capability) {
    notFound();
  }

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
        <div className="absolute inset-0 grid-texture opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar rounded-full opacity-5 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-6">
            <Link href="/capabilities" className="inline-flex items-center text-sm text-text-muted hover:text-text-secondary transition-colors">
              ← Back to Capabilities
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">Capabilities</span>
            </div>
            <div className="text-5xl">{capability.icon}</div>
            <h1>
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                {capability.title}
              </span>
            </h1>
            <p className="subheadline text-text-secondary leading-relaxed">
              {capability.hero}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/50 to-void">
        <div className="container-custom py-12" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capability.stats.map((stat: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                  {stat.label}
                </p>
                <p className="text-3xl font-display text-solar">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="mb-4">
              Services
            </h2>
            <p className="subheadline text-text-secondary max-w-2xl">
              Comprehensive capabilities across the full value chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capability.services.map((service: any, idx: number) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3>{service.name}</h3>
                <p className="subheadline text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>
              Ready to discuss your project?
            </h2>
            <p className="subheadline text-text-secondary">
              Our team is available to discuss how our {capability.title.toLowerCase()} capabilities can support your objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us →
              </Link>
              <Link href="/capabilities" className="btn-secondary">
                View All Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'project-development' },
    { slug: 'energy-finance' },
    { slug: 'asset-management' },
    { slug: 'technology' }
  ];
}
