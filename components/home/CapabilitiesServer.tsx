import dbConnect from '@/lib/mongodb';
import Capabilities from '@/models/Capabilities';
import CapabilitiesClient from './CapabilitiesClient';
import { demoCapabilities } from '@/lib/demo-data';

export default async function CapabilitiesServer() {
  await dbConnect();
  
  let data: any = await Capabilities.findOne().lean();
  
  if (!data) {
    data = {
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
    };
  }

  return <CapabilitiesClient data={JSON.parse(JSON.stringify(data))} />;
}
