import dbConnect from '@/lib/mongodb';
import Capabilities from '@/models/Capabilities';
import CapabilitiesEditorForm from '@/components/admin/CapabilitiesEditorForm';

export default async function CapabilitiesAdminPage() {
  await dbConnect();
  
  let capabilitiesData = await Capabilities.findOne().lean();
  
  if (!capabilitiesData) {
    capabilitiesData = await Capabilities.create({
      sectionTitle: 'Two Disciplines.\nOne Platform.',
      sectionDescription: 'Our integrated project management and energy finance model creates superior risk-adjusted returns for institutional capital. We combine deep sector expertise with proprietary technology to execute complex transactions at scale.',
      capabilities: [
        {
          title: 'Project Development',
          icon: '📋',
          description: 'From origination to COD, we manage the full lifecycle of complex renewable projects.',
          href: '/capabilities/project-development',
          order: 0
        },
        {
          title: 'Energy Finance',
          icon: '📊',
          description: 'Structuring deals from $50M to $2B+ across all vehicle types and capital sources.',
          href: '/capabilities/energy-finance',
          order: 1
        },
        {
          title: 'Asset Management',
          icon: '🔗',
          description: 'Post-COD portfolio optimization and performance management for stabilized assets.',
          href: '/capabilities/asset-management',
          order: 2
        },
        {
          title: 'Technology',
          icon: '⚡',
          description: 'Agnostic across Solar, Wind, BESS, and Green Hydrogen platforms.',
          href: '/capabilities/technology',
          order: 3
        }
      ]
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display mb-8">Manage Capabilities</h1>
      <CapabilitiesEditorForm data={JSON.parse(JSON.stringify(capabilitiesData))} />
    </div>
  );
}
