import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import FAQSection from '@/components/FAQ/FAQSection';

export default function CapabilitiesPage() {
  const capabilities = [
    {
      title: 'Project Development',
      description: 'From site selection to commercial operation, we manage the full lifecycle of complex renewable projects.',
      icon: '📋',
      href: '/capabilities/project-development',
      services: [
        'Site Selection & Origination',
        'Feasibility & Engineering',
        'Permitting & Regulatory',
        'Grid Interconnection',
        'EPC Management',
        'Construction Oversight',
      ],
      stats: [
        { label: 'Projects Developed', value: '340+' },
        { label: 'Capacity Managed', value: '18.2 GW' },
        { label: 'Avg Development Time', value: '24-36 months' },
      ],
    },
    {
      title: 'Energy Finance',
      description: 'Structuring and executing complex capital transactions across all vehicle types and geographies.',
      icon: '📊',
      href: '/capabilities/energy-finance',
      services: [
        'Project Finance Structuring',
        'Tax Equity & ITC Monetization',
        'Construction Financing',
        'M&A Advisory',
        'Green Bonds',
        'Fund Structures',
      ],
      stats: [
        { label: 'Capital Deployed', value: '$12.4B' },
        { label: 'Avg Deal Size', value: '$150-500M' },
        { label: 'Financing Partners', value: '40+' },
      ],
    },
    {
      title: 'Asset Management',
      description: 'Post-COD portfolio optimization and performance management for stabilized renewable assets.',
      icon: '🔗',
      href: '/capabilities/asset-management',
      services: [
        'Portfolio Optimization',
        'Performance Monitoring',
        'Operations Management',
        'Refinancing Advisory',
        'Exit Strategy',
        'Investor Reporting',
      ],
      stats: [
        { label: 'Assets Under Management', value: '$8.5B' },
        { label: 'Portfolio Companies', value: '120+' },
        { label: 'Avg Asset Age', value: '5-15 years' },
      ],
    },
    {
      title: 'Technology',
      description: 'Agnostic expertise across all renewable energy technologies and emerging platforms.',
      icon: '⚡',
      href: '/capabilities/technology',
      services: [
        'Utility-Scale Solar',
        'Onshore Wind',
        'Offshore Wind',
        'Battery Storage (BESS)',
        'Green Hydrogen',
        'Hybrid Systems',
      ],
      stats: [
        { label: 'Solar Capacity', value: '8.2 GW' },
        { label: 'Wind Capacity', value: '7.5 GW' },
        { label: 'Storage Capacity', value: '2.5 GWh' },
      ],
    },
  ];

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar rounded-full opacity-5 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">Capabilities</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight">
              <span className="text-text-primary">Two Disciplines.</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                One Platform.
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Integrated project management and energy finance capabilities enabling
              institutional capital to deploy at scale in renewable infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="section-padding">
        <div className="container-custom space-y-20">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Content */}
              <div className={`space-y-8 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-4">
                  <div className="text-5xl">{cap.icon}</div>
                  <h2 className="font-display text-3xl md:text-4xl text-text-primary">
                    {cap.title}
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                    Services
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cap.services.map((service, sidx) => (
                      <li key={sidx} className="flex items-start space-x-2">
                        <span className="text-solar text-sm flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-text-secondary text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={cap.href} className="btn-secondary inline-block">
                  Learn More →
                </Link>
              </div>

              {/* Right: Stats Card */}
              <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="card p-8 space-y-6">
                  <h3 className="font-display text-2xl text-text-primary">Key Metrics</h3>
                  <div className="space-y-6">
                    {cap.stats.map((stat, sidx) => (
                      <div key={sidx} className="pb-6 border-b border-white/[0.08] last:border-0 last:pb-0">
                        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-display text-solar">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrated Model */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl md:text-4xl text-text-primary">
                The Integrated Advantage
              </h2>
              <p className="text-lg text-text-secondary">
                Our unique combination of project development and energy finance expertise
                creates superior outcomes for institutional capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Deal Sourcing',
                  description: 'Proprietary origination capabilities across all technologies and geographies.',
                },
                {
                  title: 'Execution',
                  description: 'End-to-end project management from development through operations.',
                },
                {
                  title: 'Capital Optimization',
                  description: 'Sophisticated financing structures that maximize risk-adjusted returns.',
                },
              ].map((item, idx) => (
                <div key={idx} className="card p-8 space-y-4">
                  <h3 className="font-display text-xl text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection category="development" showHeader={false} />

      <Footer />
    </main>
  );
}
