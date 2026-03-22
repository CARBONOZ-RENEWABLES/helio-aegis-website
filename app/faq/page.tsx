import { Metadata } from 'next';
import Script from 'next/script';
import FAQSectionServer from '@/components/FAQ/FAQSectionServer';
import { generateFAQSchema } from '@/components/FAQ/faqSchema';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'FAQ | Helio Aegis',
  description: 'Frequently asked questions about renewable energy finance, project development, investor relations, and ESG compliance.',
  keywords: 'FAQ, renewable energy, project finance, infrastructure investment, ESG',
};

export default function FAQPage() {
  const schema = generateFAQSchema();

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation />
      <FAQSectionServer category="all" showHeader={true} />
      <Footer />
    </>
  );
}
