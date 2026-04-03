import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import CTASectionClient from './CTASectionClient';

const defaultCTAData = {
  headline: 'Ready to deploy capital in the energy transition?',
  subheadline: 'Our team works with institutional investors, project developers, and government entities to structure and execute transformational renewable infrastructure deals.',
  primaryCTALabel: 'Schedule a Meeting',
  primaryCTAHref: '/contact',
  secondaryCTALabel: 'Download Investment Deck',
  secondaryCTAHref: '/contact',
  trustSignal1: 'Typically responds within 24 hours',
  trustSignal2: 'NDA available upon request',
  trustSignal3: 'Strict confidentiality'
};

export default async function CTASectionServer() {
  try {
    const homepage: any = await Homepage.findOne({}).lean();
    
    const ctaData = {
      headline: homepage?.finalCTA?.headline || defaultCTAData.headline,
      subheadline: homepage?.finalCTA?.subheadline || defaultCTAData.subheadline,
      primaryCTALabel: homepage?.finalCTA?.primaryCTALabel || defaultCTAData.primaryCTALabel,
      primaryCTAHref: homepage?.finalCTA?.primaryCTAHref || defaultCTAData.primaryCTAHref,
      secondaryCTALabel: homepage?.finalCTA?.secondaryCTALabel || defaultCTAData.secondaryCTALabel,
      secondaryCTAHref: homepage?.finalCTA?.secondaryCTAHref || defaultCTAData.secondaryCTAHref,
      trustSignal1: homepage?.finalCTA?.trustSignal1 || defaultCTAData.trustSignal1,
      trustSignal2: homepage?.finalCTA?.trustSignal2 || defaultCTAData.trustSignal2,
      trustSignal3: homepage?.finalCTA?.trustSignal3 || defaultCTAData.trustSignal3
    };

    return <CTASectionClient data={ctaData} />;
  } catch (error) {
    console.error('Error fetching CTA data:', error);
    return <CTASectionClient data={defaultCTAData} />;
  }
}
