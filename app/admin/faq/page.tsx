import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import Link from 'next/link';
import DeleteFAQButton from '@/components/admin/DeleteFAQButton';

export default async function FAQAdminPage() {
  await dbConnect();
  const faqs = await FAQ.find().sort({ category: 1, order: 1 }).lean();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display">Manage FAQs</h1>
        <Link href="/admin/faq/new" className="btn-primary">
          + Add FAQ
        </Link>
      </div>

      <div className="space-y-4">
        {faqs.map((faq: any) => (
          <div key={faq._id.toString()} className="card p-6 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono px-2 py-1 bg-solar/20 text-solar rounded">
                  {faq.category}
                </span>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  faq.status === 'published' ? 'bg-growth/20 text-growth' : 'bg-slate-mid text-text-muted'
                }`}>
                  {faq.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-text-secondary line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Link href={`/admin/faq/${faq._id}`} className="btn-ghost text-sm px-4 py-2">
                Edit
              </Link>
              <DeleteFAQButton id={faq._id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
