import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import HeroClient from './HeroClient';
import { demoHomepage } from '@/lib/demo-data';

export default async function Hero() {
  await dbConnect();
  
  let homepage: any = await Homepage.findOne({}).lean();
  
  const heroData = {
    eyebrowText: homepage?.hero?.eyebrowText || 'Energy Finance & Project Management',
    headlineLine1: homepage?.hero?.headlineLine1 || 'Structuring the',
    headlineLine2: homepage?.hero?.headlineLine2 || 'Clean Energy Future',
    subheadline: homepage?.hero?.subheadline || 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and Africa. Institutional capital at scale.',
    primaryCTALabel: homepage?.hero?.primaryCTALabel || 'Explore Our Portfolio',
    primaryCTAHref: homepage?.hero?.primaryCTAHref || '/portfolio',
    secondaryCTALabel: homepage?.hero?.secondaryCTALabel || 'Investment Deck',
    secondaryCTAHref: homepage?.hero?.secondaryCTAHref || '/contact',
    backgroundType: homepage?.hero?.backgroundType || 'gradient',
    backgroundImage: homepage?.hero?.backgroundImage || '',
    backgroundVideo: homepage?.hero?.backgroundVideo || '',
    overlayOpacity: homepage?.hero?.overlayOpacity || 0.7,
  };

  const metrics = homepage?.metrics || [
    { value: '12.4', label: 'Capital Deployed', suffix: 'B' },
    { value: '18.2', label: 'Capacity Managed', suffix: ' GW' },
    { value: '340', label: 'Projects Closed', suffix: '+' }
  ];

  return <HeroClient hero={heroData} metrics={metrics} />;
}
