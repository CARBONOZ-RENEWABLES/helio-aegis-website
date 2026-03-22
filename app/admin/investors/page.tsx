import dbConnect from '@/lib/mongodb';
import InvestorsPage from '@/models/InvestorsPage';
import InvestorsEditorForm from '@/components/admin/InvestorsEditorForm';

export default async function InvestorsAdminPage() {
  await dbConnect();
  
  let data = await InvestorsPage.findOne().lean();
  
  if (!data) {
    data = await InvestorsPage.create({
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
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display mb-8">Manage Investors Page</h1>
      <InvestorsEditorForm data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
}
