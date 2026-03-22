import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import InsightImage from '@/components/insights/InsightImage';
import { insights, typeColors } from '@/components/insights/insightsData';

interface InsightPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const insight = insights.find((i) => i.id === parseInt(params.id));

  if (!insight) {
    return {
      title: 'Insight Not Found',
    };
  }

  return {
    title: `${insight.title} | Helio Aegis Insights`,
    description: insight.excerpt,
    keywords: `${insight.category}, renewable energy, ${insight.type}`,
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const insight = insights.find((i) => i.id === parseInt(params.id));

  if (!insight) {
    return (
      <>
        <Navigation />
        <main className="w-full bg-void min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl text-text-primary">Insight Not Found</h1>
            <p className="text-text-secondary">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/insights" className="text-solar hover:text-solar-dim transition-colors">
              Back to Insights →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedInsights = insights
    .filter((i) => i.id !== insight.id && i.category === insight.category)
    .slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="w-full bg-void">
        {/* Hero Section with Featured Image */}
        <section className="relative pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-texture opacity-10" />

          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mb-8 text-sm">
              <Link href="/insights" className="text-text-secondary hover:text-text-primary transition-colors">
                Insights
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-text-primary">{insight.title}</span>
            </div>

            {/* Header */}
            <div className="max-w-4xl space-y-6 mb-12">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex px-3 py-1 rounded-sm text-xs font-semibold border ${
                    typeColors[insight.type]
                  }`}
                >
                  {insight.type}
                </div>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded-sm">
                  {insight.category}
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl leading-tight text-text-primary">
                {insight.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-white/[0.08]">
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    By <span className="font-semibold">{insight.author}</span>
                  </p>
                  <p className="text-xs text-text-muted">{insight.authorRole}</p>
                </div>
                <div className="flex items-center gap-6 text-sm text-text-muted">
                  <span>{insight.date}</span>
                  <span>{insight.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-4xl mb-12">
              <InsightImage
                src={insight.featuredImage.src}
                alt={insight.featuredImage.alt}
                caption={insight.featuredImage.caption}
                className="w-full h-96 md:h-[500px] rounded-lg"
                priority
              />
              <p className="text-sm text-text-muted mt-3">{insight.featuredImage.caption}</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {insight.sections.map((section, idx) => (
                  <div key={idx} className="space-y-6">
                    <h2 className="font-display text-3xl text-text-primary">{section.heading}</h2>

                    <p className="text-lg text-text-secondary leading-relaxed">{section.content}</p>

                    {section.image && (
                      <div className="space-y-3">
                        <InsightImage
                          src={section.image.src}
                          alt={section.image.alt}
                          caption={section.image.caption}
                          className="w-full h-80 rounded-lg"
                        />
                        <p className="text-sm text-text-muted">{section.image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Key Takeaways */}
                <div className="card p-6 space-y-4 sticky top-20">
                  <h3 className="font-display text-xl text-text-primary">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {insight.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-solar flex-shrink-0 mt-1">✓</span>
                        <span className="text-sm text-text-secondary leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Author Card */}
                <div className="card p-6 space-y-4">
                  <h3 className="font-display text-lg text-text-primary">About the Author</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">{insight.author}</p>
                    <p className="text-sm text-text-secondary">{insight.authorRole}</p>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Expert in renewable energy finance and project development with 15+ years of industry experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <section className="section-padding bg-slate-dark">
            <div className="container-custom">
              <h2 className="font-display text-3xl text-text-primary mb-12">Related Insights</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedInsights.map((related) => (
                  <Link
                    key={related.id}
                    href={`/insights/${related.id}`}
                    className="card p-6 flex flex-col space-y-4 group hover:border-solar/40 transition-all duration-300"
                  >
                    <div
                      className={`inline-flex w-fit px-3 py-1 rounded-sm text-xs font-semibold border ${
                        typeColors[related.type]
                      }`}
                    >
                      {related.type}
                    </div>

                    <p className="text-xs text-text-muted font-mono">{related.date}</p>

                    <h3 className="font-display text-lg text-text-primary group-hover:text-solar transition-colors">
                      {related.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                      {related.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                      <span className="text-xs text-text-muted">{related.readTime}</span>
                      <span className="text-solar font-semibold text-sm">Read →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom max-w-2xl">
            <div className="card p-12 text-center space-y-6">
              <h2 className="font-display text-3xl text-text-primary">
                Stay Updated on Energy Markets
              </h2>
              <p className="text-lg text-text-secondary">
                Subscribe to our monthly newsletter for market insights, policy updates, and investment opportunities.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/[0.08] rounded-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-solar transition-colors"
                />
                <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}