import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import EditInsightForm from '@/components/admin/EditInsightForm';

export default async function EditInsightPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  const insight = await Insight.findById(params.id).lean();
  
  if (!insight) {
    notFound();
  }

  return <EditInsightForm insight={JSON.parse(JSON.stringify(insight))} />;
}
