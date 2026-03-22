import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import HomepageEditorForm from '@/components/admin/HomepageEditorForm';

export default async function HomepageEditorPage() {
  await dbConnect();
  
  let homepage = await Homepage.findOne({}).lean();
  
  if (!homepage) {
    // Create default homepage if doesn't exist
    homepage = await Homepage.create({
      hero: {
        eyebrowText: 'Energy Finance & Project Management',
        headlineLine1: 'Structuring the',
        headlineLine2: 'Clean Energy Future',
        subheadline: 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and MENA. Institutional capital at scale.',
        primaryCTALabel: 'Explore Our Portfolio',
        primaryCTAHref: '/portfolio',
        secondaryCTALabel: 'Investment Deck',
        secondaryCTAHref: '/contact',
        backgroundType: 'gradient',
        overlayOpacity: 0.7
      },
      metrics: [
        { value: '12.4', label: 'Capital Deployed', suffix: 'B', order: 1 },
        { value: '18.2', label: 'Capacity Managed', suffix: ' GW', order: 2 },
        { value: '340', label: 'Projects Closed', suffix: '+', order: 3 }
      ],
      status: 'published',
      lastEditedBy: 'system'
    });
    homepage = await Homepage.findOne({}).lean();
  }

  return <HomepageEditorForm homepage={JSON.parse(JSON.stringify(homepage))} />;
}
