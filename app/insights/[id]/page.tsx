import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';

interface InsightPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  await dbConnect();
  
  const insight = await Insight.findOne({ slug: params.id, status: 'published' }).lean() as any;

  if (!insight) {
    return {
      title: 'Insight Not Found',
    };
  }

  return {
    title: `${insight.title} | Helios NRG Insights`,
    description: insight.excerpt,
    keywords: `${insight.category}, renewable energy, ${insight.type}`,
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  await dbConnect();
  
  const insight = await Insight.findOne({ slug: params.id, status: 'published' }).lean();

  if (!insight) {
    return (
      <>
        <Navigation />
        <main className="w-full bg-void min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1>Insight Not Found</h1>
            <p className="subheadline text-text-secondary">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/insights" className="text-solar hover:text-solar-dim transition-colors">
              Back to Insights →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const insightData: any = insight;
  const relatedInsights = await Insight.find({
    _id: { $ne: (insight as any)?._id },
    category: (insight as any)?.category,
    status: 'published'
  }).limit(3).lean();

  const typeColors: Record<string, string> = {
    Research: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
    Commentary: 'bg-solar/20 text-solar border-solar/40',
    Report: 'bg-growth/20 text-growth border-growth/40',
  };

  return (
    <>
      <Navigation />
      <main className="w-full bg-void">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-texture opacity-10" />

          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mb-8 text-sm">
              <Link href="/insights" className="text-text-secondary hover:text-text-primary transition-colors">
                Insights
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-text-primary">{insightData.title}</span>
            </div>

            {/* Header */}
            <div className="max-w-4xl space-y-6 mb-12">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex px-3 py-1 rounded-sm text-xs font-semibold border ${
                    typeColors[insightData.type]
                  }`}
                >
                  {insightData.type}
                </div>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded-sm">
                  {insightData.category}
                </span>
              </div>

              <h1>
                {insightData.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-white/[0.08]">
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    By <span className="font-semibold">{insightData.author || 'Helios NRG Team'}</span>
                  </p>
                  {insightData.authorRole && (
                    <p className="text-xs text-text-muted">{insightData.authorRole}</p>
                  )}
                </div>
                <div className="flex items-center gap-6 text-sm text-text-muted">
                  <span>
                    {new Date(insightData.publishedAt || insightData.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>{insightData.readTime || '5 min read'}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {insightData.featuredImage && (
              <div className="max-w-4xl mb-12">
                <img
                  src={insightData.featuredImage}
                  alt={insightData.title}
                  className="w-full h-96 md:h-[500px] rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="subheadline text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {insightData.content}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Key Takeaways */}
                {insightData.keyTakeaways && insightData.keyTakeaways.length > 0 && (
                  <div className="card p-6 space-y-4 sticky top-20">
                    <h3>Key Takeaways</h3>
                    <ul className="space-y-3">
                      {insightData.keyTakeaways.map((takeaway: string, idx: number) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-solar flex-shrink-0 mt-1">✓</span>
                          <span className="text-sm text-text-secondary leading-relaxed">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Author Card */}
                {insightData.author && (
                  <div className="card p-6 space-y-4">
                    <h3>About the Author</h3>
                    <div className="space-y-2">
                      <p className="font-semibold text-text-primary">{insightData.author}</p>
                      {insightData.authorRole && (
                        <p className="text-sm text-text-secondary">{insightData.authorRole}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <section className="section-padding bg-slate-dark">
            <div className="container-custom">
              <h2 className="mb-12">Related Insights</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedInsights.map((related: any) => (
                  <Link
                    key={related._id.toString()}
                    href={`/insights/${related.slug}`}
                    className="card p-6 flex flex-col space-y-4 group hover:border-solar/40 transition-all duration-300"
                  >
                    <div
                      className={`inline-flex w-fit px-3 py-1 rounded-sm text-xs font-semibold border ${
                        typeColors[related.type]
                      }`}
                    >
                      {related.type}
                    </div>

                    <p className="text-xs text-text-muted font-mono">
                      {new Date(related.publishedAt || related.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>

                    <h3>
                      {related.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed flex-grow line-clamp-3">
                      {related.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                      <span className="text-xs text-text-muted">{related.readTime || '5 min read'}</span>
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
              <h2>
                Stay Updated on Energy Markets
              </h2>
              <p className="subheadline text-text-secondary">
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
