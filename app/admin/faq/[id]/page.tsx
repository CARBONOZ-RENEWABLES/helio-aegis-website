import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import EditFAQForm from '@/components/admin/EditFAQForm';
import { notFound } from 'next/navigation';

export default async function EditFAQPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const faq = await FAQ.findById(params.id).lean();

  if (!faq) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display mb-8">Edit FAQ</h1>
      <EditFAQForm faq={JSON.parse(JSON.stringify(faq))} />
    </div>
  );
}
