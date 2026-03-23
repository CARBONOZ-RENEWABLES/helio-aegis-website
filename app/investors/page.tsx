import dbConnect, { DEMO_MODE } from '@/lib/mongodb';
import InvestorsPage from '@/models/InvestorsPage';
import FAQ from '@/models/FAQ';
import InvestorsClient from './InvestorsClient';

export default async function InvestorsPageServer() {
  if (!DEMO_MODE) {
    await dbConnect();
  }
  
  let data: any = DEMO_MODE ? null : await InvestorsPage.findOne().lean();
  
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

  const faqs = DEMO_MODE ? [] : await FAQ.find({ status: 'published', category: 'investors' }).sort({ order: 1 }).lean();

  return <InvestorsClient data={JSON.parse(JSON.stringify(data))} faqs={JSON.parse(JSON.stringify(faqs))} />;
}
