import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import InsightsClient from './InsightsClient';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

export default async function InsightsPage() {
  await dbConnect();
  
  const insights = await Insight.find({ status: 'published' })
    .sort({ publishedAt: -1, updatedAt: -1 })
    .lean();

  const serializedInsights = insights.map((insight: any) => ({
    id: insight._id.toString(),
    slug: insight.slug,
    type: insight.type,
    category: insight.category,
    title: insight.title,
    excerpt: insight.excerpt,
    date: insight.publishedAt 
      ? new Date(insight.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : new Date(insight.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: insight.readTime || '5 min read',
    featured: insight.featured || false,
  }));

  return (
    <main className="w-full bg-void">
      <Navigation />
      <InsightsClient insights={serializedInsights as any} />
      <Footer />
    </main>
  );
}
