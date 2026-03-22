import dbConnect, { DEMO_MODE } from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import FAQSectionClient from './FAQSectionClient';

interface FAQSectionProps {
  category?: string;
  showHeader?: boolean;
}

export default async function FAQSection({ category = 'all', showHeader = true }: FAQSectionProps) {
  if (!DEMO_MODE) {
    await dbConnect();
  }
  const faqs = DEMO_MODE ? [] : await FAQ.find({ status: 'published' }).sort({ category: 1, order: 1 }).lean();

  return <FAQSectionClient faqs={JSON.parse(JSON.stringify(faqs))} category={category} showHeader={showHeader} />;
}
