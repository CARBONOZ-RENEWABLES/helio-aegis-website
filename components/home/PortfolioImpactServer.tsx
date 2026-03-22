import dbConnect from '@/lib/mongodb';
import Metrics from '@/models/Metrics';
import PortfolioImpactClient from './PortfolioImpactClient';

export default async function PortfolioImpact() {
  await dbConnect();
  
  let data: any = await Metrics.findOne().lean();
  
  if (!data) {
    data = {
      sectionTitle: 'Scale built on executed deals.',
      sectionSubtitle: 'Since 2012, Helio Aegis has structured and delivered:',
      metrics: [
        { value: 12.4, prefix: '$', suffix: 'B', label: 'Capital Deployed', order: 0 },
        { value: 18.2, prefix: '', suffix: ' GW', label: 'Capacity Managed', order: 1 },
        { value: 340, prefix: '', suffix: '+', label: 'Projects Closed', order: 2 },
        { value: 2.8, prefix: '', suffix: 'M', label: 'Homes Powered', order: 3 },
        { value: 96, prefix: '', suffix: '%', label: 'On-Time Delivery', order: 4 }
      ]
    };
  }

  return <PortfolioImpactClient data={JSON.parse(JSON.stringify(data))} />;
}
