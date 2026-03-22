'use client';

import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import FAQSectionClient from '@/components/FAQ/FAQSectionClient';

export default function InvestorsClient({ data, faqs }: any) {
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
              <span className="eyebrow">Investors</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight">
              <span className="text-text-primary">{data.hero.headline.split('\n')[0]}</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                {data.hero.headline.split('\n')[1]}
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              {data.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* AUM & Track Record */}
      <section className="border-y border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/50 to-void">
        <div className="container-custom px-6 md:px-12 lg:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, idx: number) => (
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

      {/* Fund Structures */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
              Fund Structures
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Diversified fund offerings tailored to different investor risk-return profiles
              and deployment timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.fundStructures.map((fund: any, idx: number) => (
              <div key={idx} className="card p-8 space-y-6 flex flex-col">
                <div>
                  <h3 className="font-display text-2xl text-text-primary">{fund.name}</h3>
                  <p className="text-sm text-solar font-semibold mt-1">{fund.subtitle}</p>
                </div>
                <p className="text-text-secondary">{fund.description}</p>

                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div className="flex justify-between">
                    <span className="text-xs text-text-muted uppercase tracking-widest">Target IRR</span>
                    <span className="text-sm font-display text-solar">{fund.targetIRR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-muted uppercase tracking-widest">Hold Period</span>
                    <span className="text-sm font-display text-solar">{fund.holdPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-muted uppercase tracking-widest">AUM</span>
                    <span className="text-sm font-display text-solar">{fund.aum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-muted uppercase tracking-widest">Vintage Years</span>
                    <span className="text-sm font-display text-solar">{fund.vintageYears}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {fund.features?.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start space-x-2">
                        <span className="text-solar text-xs flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-xs text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn-secondary w-full text-sm mt-auto">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
              Track Record
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Consistent performance across market cycles with institutional-grade risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'Returns',
                metrics: [
                  { label: 'Net IRR Range', value: '8-14%' },
                  { label: 'TVPI Range', value: '1.3x - 1.8x' },
                  { label: 'Avg Hold Period', value: '7-10 years' },
                ],
              },
              {
                title: 'Scale',
                metrics: [
                  { label: 'Capital Deployed', value: '$12.4B' },
                  { label: 'Projects Closed', value: '340+' },
                  { label: 'Capacity Managed', value: '18.2 GW' },
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="card p-8 space-y-6">
                <h3 className="font-display text-2xl text-text-primary">{section.title}</h3>
                <div className="space-y-4">
                  {section.metrics.map((metric, midx) => (
                    <div key={midx} className="pb-4 border-b border-white/[0.08] last:border-0 last:pb-0">
                      <p className="text-xs text-text-muted uppercase tracking-widest mb-2">
                        {metric.label}
                      </p>
                      <p className="text-3xl font-display text-solar">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vintage Performance */}
          <div className="card p-8 space-y-6">
            <h3 className="font-display text-2xl text-text-primary">Vintage Year Performance</h3>
            <div className="space-y-3">
              {data.vintagePerformance?.map((row: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between pb-3 border-b border-white/[0.08] last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {row.vintage}
                    </span>
                    <span className="text-xs px-2 py-1 bg-white/5 rounded-sm text-text-muted">
                      {row.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-xs text-text-muted">IRR</p>
                      <p className="text-sm font-display text-solar">{row.irr}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted">TVPI</p>
                      <p className="text-sm font-display text-solar">{row.tvpi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Room */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <div className="card p-12 text-center space-y-6">
            <h2 className="font-display text-3xl text-text-primary">
              Access Our Data Room
            </h2>
            <p className="text-lg text-text-secondary">
              Institutional investors can access our comprehensive due diligence materials,
              including fund documents, performance reports, ESG data, and financial statements.
            </p>
            <div className="space-y-3 pt-4">
              <button className="btn-primary w-full">Request Data Room Access</button>
              <button className="btn-ghost w-full">Download Teaser Document</button>
            </div>
            <p className="text-xs text-text-muted">
              All inquiries are handled with strict confidentiality. NDA available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* IR Contacts */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <h2 className="font-display text-3xl text-text-primary mb-12">
            Investor Relations Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.irContacts.map((contact: any, idx: number) => (
              <div key={idx} className="card p-8 text-center space-y-4">
                {contact.profileImage ? (
                  <div className="w-16 h-16 mx-auto rounded-sm overflow-hidden">
                    <img src={contact.profileImage} alt={contact.name} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-solar/20 to-hydrogen/20 rounded-sm flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <div>
                  <h3 className="font-display text-lg text-text-primary">{contact.name}</h3>
                  <p className="text-sm text-solar font-semibold mt-1">{contact.title}</p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-sm text-hydrogen hover:text-hydrogen-dim transition-colors"
                  >
                    {contact.email}
                  </a>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="block text-sm text-hydrogen hover:text-hydrogen-dim transition-colors"
                    >
                      {contact.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSectionClient faqs={faqs} category="investors" showHeader={false} />

      <Footer />
    </main>
  );
}
