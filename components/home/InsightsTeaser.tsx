import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import InsightsTeaserClient from './InsightsTeaserClient';

export default async function InsightsTeaser() {
  await dbConnect();
  
  const insights = await Insight.find({ 
    status: 'published',
    featured: true 
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const serializedInsights = insights.map((insight: any) => ({
    id: insight._id.toString(),
    slug: insight.slug,
    type: insight.type,
    title: insight.title,
    excerpt: insight.excerpt,
    date: insight.publishedAt 
      ? new Date(insight.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : new Date(insight.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: insight.readTime || '5 min read',
    featured: insight.featured || false,
  }));

  return <InsightsTeaserClient insights={serializedInsights} />;
}
