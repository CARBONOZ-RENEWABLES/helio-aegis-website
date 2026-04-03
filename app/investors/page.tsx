import dbConnect from '@/lib/mongodb';
import InvestorsPage from '@/models/InvestorsPage';
import FAQ from '@/models/FAQ';
import InvestorsClient from './InvestorsClient';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

export default async function InvestorsPageServer() {
  await dbConnect();
  
  let data: any = await InvestorsPage.findOne().lean();
  
  if (!data) {
    data = {
      hero: {
        eyebrow: 'Investors',
        headline: 'Institutional-Grade\nRenewable Infrastructure',
        description: 'Proven track record of deploying capital at scale across utility-scale renewable infrastructure with institutional-grade governance and risk management.'
      },
      stats: [
        { label: 'Assets Under Management', value: '$8.5B', order: 0 },
        { label: 'Capital Deployed', value: '$12.4B', order: 1 },
        { label: 'Portfolio Companies', value: '120+', order: 2 },
        { label: 'Fund Vintages', value: '8', order: 3 }
      ],
      fundStructures: [],
      irContacts: []
    };
  }

  const faqs = await FAQ.find({ status: 'published', category: 'investors' }).sort({ order: 1 }).lean();

  return (
    <main className="w-full bg-void">
      <Navigation />
      <InvestorsClient data={JSON.parse(JSON.stringify(data))} faqs={JSON.parse(JSON.stringify(faqs))} />
      <Footer />
    </main>
  );
}
