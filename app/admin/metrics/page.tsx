import dbConnect from '@/lib/mongodb';
import Metrics from '@/models/Metrics';
import MetricsEditorForm from '@/components/admin/MetricsEditorForm';

export default async function MetricsAdminPage() {
  await dbConnect();
  
  let metricsData = await Metrics.findOne().lean();
  
  if (!metricsData) {
    metricsData = await Metrics.create({
      sectionTitle: 'Scale built on executed deals.',
      sectionSubtitle: 'Since 2012, Helios NRG has structured and delivered:',
      metrics: [
        { value: 12.4, prefix: '$', suffix: 'B', label: 'Capital Deployed', order: 0 },
        { value: 18.2, prefix: '', suffix: ' GW', label: 'Capacity Managed', order: 1 },
        { value: 340, prefix: '', suffix: '+', label: 'Projects Closed', order: 2 },
        { value: 2.8, prefix: '', suffix: 'M', label: 'Homes Powered', order: 3 },
        { value: 96, prefix: '', suffix: '%', label: 'On-Time Delivery', order: 4 }
      ]
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display mb-8">Manage Portfolio Metrics</h1>
      <MetricsEditorForm data={JSON.parse(JSON.stringify(metricsData))} />
    </div>
  );
}
