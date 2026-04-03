import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  const project = await Project.findOne({ 
    slug: params.id,
    status: 'published'
  }).lean();

  if (!project) {
    return (
      <main className="w-full bg-void">
        <Navigation />
        <section className="section-padding text-center">
          <div className="container-custom">
            <h1 className="mb-4">Project Not Found</h1>
            <p className="subheadline text-text-secondary mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/portfolio" className="btn-primary">
              Back to Portfolio
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const projectData: any = project;

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={projectData.media?.heroImage || 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1200&h=600&fit=crop'}
          alt={projectData.basicInfo?.name}
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
                <span className="text-text-secondary">{projectData.basicInfo?.name}</span>
              </div>
              <h1>{projectData.basicInfo?.name}</h1>
              <p className="subheadline text-text-secondary">
                {projectData.basicInfo?.location?.city}, {projectData.basicInfo?.location?.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/30 to-void">
        <div className="container-custom py-8" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Capacity</p>
              <p className="font-display text-xl text-solar">{projectData.basicInfo?.capacityMW} MW</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Technology</p>
              <p className="font-display text-xl text-solar capitalize">{projectData.basicInfo?.technology}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Status</p>
              <p className="font-display text-xl text-solar uppercase">{projectData.basicInfo?.status}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-2">COD</p>
              <p className="font-display text-xl text-solar">{projectData.basicInfo?.codDate || 'TBD'}</p>
            </div>
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
                <h2>Project Overview</h2>
                <p className="subheadline text-text-secondary leading-relaxed">
                  {projectData.basicInfo?.fullDescription || projectData.basicInfo?.shortDescription}
                </p>
              </div>

              {/* Key Metrics */}
              {projectData.technicalSpecs && (
                <div className="card p-8 space-y-6">
                  <h3>Key Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {projectData.technicalSpecs.annualGenerationMWh && (
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Generation</p>
                        <p className="font-display text-2xl text-solar">
                          {(projectData.technicalSpecs.annualGenerationMWh / 1000).toFixed(0)} GWh/year
                        </p>
                      </div>
                    )}
                    {projectData.technicalSpecs.homesPowered && (
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Homes</p>
                        <p className="font-display text-2xl text-solar">
                          {projectData.technicalSpecs.homesPowered.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {projectData.technicalSpecs.co2AvoidedTonnes && (
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">CO2 Avoided</p>
                        <p className="font-display text-2xl text-solar">
                          {(projectData.technicalSpecs.co2AvoidedTonnes / 1000).toFixed(0)}K tonnes/year
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {projectData.timeline && projectData.timeline.length > 0 && (
                <div className="space-y-4">
                  <h3>Project Timeline</h3>
                  <div className="space-y-3">
                    {projectData.timeline.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="card p-4 flex items-center justify-between hover:border-solar/40 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-solar rounded-full" />
                          <div>
                            <p className="font-semibold text-text-primary">{item.milestone}</p>
                            <p className="text-sm text-text-muted">{item.date}</p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-sm ${
                            item.completed
                              ? 'bg-growth/20 text-growth'
                              : 'bg-hydrogen/20 text-hydrogen'
                          }`}
                        >
                          {item.completed ? 'Completed' : 'Planned'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Financial Highlights */}
              {projectData.financialHighlights && (
                <div className="card p-8 space-y-4">
                  <h3>Financial Highlights</h3>
                  <div className="space-y-3">
                    {projectData.financialHighlights.totalProjectCost && (
                      <div className="pb-3 border-b border-white/[0.08]">
                        <p className="text-xs text-text-muted uppercase tracking-widest">Total Cost</p>
                        <p className="font-semibold text-text-primary">{projectData.financialHighlights.totalProjectCost}</p>
                      </div>
                    )}
                    {projectData.financialHighlights.debtProvider && (
                      <div className="pb-3 border-b border-white/[0.08]">
                        <p className="text-xs text-text-muted uppercase tracking-widest">Debt Provider</p>
                        <p className="font-semibold text-text-primary">{projectData.financialHighlights.debtProvider}</p>
                      </div>
                    )}
                    {projectData.financialHighlights.offtaker && (
                      <div className="pb-3 border-b border-white/[0.08] last:border-0 last:pb-0">
                        <p className="text-xs text-text-muted uppercase tracking-widest">Offtaker</p>
                        <p className="font-semibold text-text-primary">{projectData.financialHighlights.offtaker}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link href="/contact" className="btn-primary w-full block text-center">
                Request More Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
