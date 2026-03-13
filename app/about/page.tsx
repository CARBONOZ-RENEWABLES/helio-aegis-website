import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
              <span className="eyebrow">About Helio Aegis</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight">
              <span className="text-text-primary">Structuring the</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                Clean Energy Future
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Since 2012, Helio Aegis has been at the forefront of renewable energy project
              management and energy finance, structuring and delivering transformational
              infrastructure across North America, Europe, and MENA.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/50 to-void">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Active', value: '13+' },
              { label: 'Capital Deployed', value: '$12.4B' },
              { label: 'Projects Delivered', value: '340+' },
              { label: 'Team Members', value: '150+' },
            ].map((stat, idx) => (
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

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Story */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                  <p>
                    Helio Aegis was founded on a simple premise: the energy transition requires
                    more than capital. It requires integrated expertise in project development,
                    energy finance, and institutional-grade execution.
                  </p>
                  <p>
                    Over the past decade, we&apos;ve structured and delivered $12.4B in renewable
                    infrastructure across 340+ projects, serving institutional investors, project
                    developers, and government agencies worldwide.
                  </p>
                  <p>
                    Our success is built on deep sector expertise, proprietary deal sourcing, and
                    an unwavering commitment to delivering results for our partners.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Mission & Values */}
            <div className="space-y-8">
              <div className="card p-8 space-y-4">
                <h3 className="font-display text-2xl text-text-primary">Our Mission</h3>
                <p className="text-text-secondary leading-relaxed">
                  To accelerate the global energy transition by combining deep sector expertise
                  with proprietary technology, enabling institutional capital to deploy at scale
                  in renewable infrastructure.
                </p>
              </div>

              <div className="card p-8 space-y-6">
                <h3 className="font-display text-2xl text-text-primary">Core Values</h3>
                <ul className="space-y-4">
                  {[
                    'Authoritative expertise backed by data and results',
                    'Institutional-grade governance and risk management',
                    'Integrated approach to project development and finance',
                    'Commitment to ESG and climate impact',
                    'Long-term partnership mentality',
                  ].map((value, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-solar text-lg flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-text-secondary">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Experienced executives with deep expertise in renewable energy, project finance,
              and institutional capital markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                title: 'Chief Executive Officer',
                bio: '20+ years in renewable energy finance and project development. Former Managing Director at Goldman Sachs.',
                expertise: ['Project Finance', 'M&A', 'Capital Markets'],
              },
              {
                name: 'Michael Rodriguez',
                title: 'Chief Investment Officer',
                bio: '18 years in infrastructure investing and capital markets. Led $4B+ in renewable energy investments.',
                expertise: ['Infrastructure', 'Fund Management', 'Risk Management'],
              },
              {
                name: 'Dr. James Wilson',
                title: 'Chief Technology Officer',
                bio: '15 years in renewable energy engineering and operations. PhD in Electrical Engineering.',
                expertise: ['Solar', 'Wind', 'Energy Storage'],
              },
              {
                name: 'Lisa Martinez',
                title: 'Chief Operating Officer',
                bio: '12 years in operations and project management. Scaled operations across 5 continents.',
                expertise: ['Operations', 'Project Management', 'Compliance'],
              },
              {
                name: 'David Thompson',
                title: 'Head of Project Development',
                bio: '16 years in project development. Originated 8+ GW of renewable capacity.',
                expertise: ['Development', 'Permitting', 'EPC Management'],
              },
              {
                name: 'Jennifer Park',
                title: 'Head of Investor Relations',
                bio: '14 years in institutional investor relations. Manages relationships with 50+ LPs.',
                expertise: ['Investor Relations', 'Communications', 'Reporting'],
              },
            ].map((leader, idx) => (
              <div key={idx} className="card p-8 space-y-6 flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-solar/20 to-hydrogen/20 rounded-sm flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-text-primary">{leader.name}</h3>
                  <p className="text-sm text-solar font-semibold">{leader.title}</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                  {leader.bio}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {leader.expertise.map((exp, eidx) => (
                    <span
                      key={eidx}
                      className="px-2 py-1 bg-white/5 text-xs text-text-muted rounded-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
              Global Presence
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Operating across multiple continents with regional expertise and local partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'North America',
                office: 'New York, USA',
                team: '45+ professionals',
                focus: 'Solar, Wind, Storage',
              },
              {
                region: 'Europe',
                office: 'London, UK',
                team: '35+ professionals',
                focus: 'Offshore Wind, Solar',
              },
              {
                region: 'MENA',
                office: 'Dubai, UAE',
                team: '25+ professionals',
                focus: 'Solar, Green Hydrogen',
              },
            ].map((office, idx) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3 className="font-display text-2xl text-text-primary">{office.region}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Office
                    </p>
                    <p className="text-text-secondary font-semibold">{office.office}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Team
                    </p>
                    <p className="text-text-secondary">{office.team}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Focus Areas
                    </p>
                    <p className="text-text-secondary">{office.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Commitment */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl md:text-4xl text-text-primary">
                ESG & Climate Commitment
              </h2>
              <p className="text-lg text-text-secondary">
                We are committed to advancing the UN Sustainable Development Goals and
                accelerating the global energy transition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Climate Impact',
                  metrics: [
                    { label: 'CO2 Avoided (Annual)', value: '2.8M tonnes' },
                    { label: 'Renewable Capacity', value: '18.2 GW' },
                  ],
                },
                {
                  title: 'Certifications',
                  metrics: [
                    { label: 'GRESB Rating', value: '5-Star' },
                    { label: 'UN PRI Signatory', value: 'Yes' },
                  ],
                },
              ].map((section, idx) => (
                <div key={idx} className="card p-8 space-y-6">
                  <h3 className="font-display text-2xl text-text-primary">{section.title}</h3>
                  <div className="space-y-4">
                    {section.metrics.map((metric, midx) => (
                      <div key={midx} className="flex justify-between items-center pb-4 border-b border-white/[0.08]">
                        <span className="text-sm text-text-muted">{metric.label}</span>
                        <span className="text-lg font-display text-solar">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
