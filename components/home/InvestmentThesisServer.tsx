import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import InvestmentThesisClient from './InvestmentThesisClient';

const defaultInvestmentData = {
  eyebrowText: 'Investment Case',
  headline: 'Built for institutional capital at every stage.',
  bodyText: 'Our integrated project management and energy finance model creates superior risk-adjusted returns. We combine deep sector expertise with proprietary technology to execute complex transactions at scale.',
  features: [
    'Integrated PM + Finance model',
    'Proprietary deal sourcing',
    'Institutional-grade governance'
  ],
  tabs: [
    {
      id: 'track-record',
      label: 'Track Record',
      title: 'Proven Performance',
      content: 'Our funds have delivered consistent returns across market cycles.',
      metrics: [
        { label: 'Net IRR Range', value: '8-12%' },
        { label: 'TVPI Range', value: '1.3x - 1.8x' },
        { label: 'Avg Hold Period', value: '7-10 years' }
      ]
    },
    {
      id: 'risk-management',
      label: 'Risk Management',
      title: 'Institutional Risk Controls',
      content: 'Comprehensive risk mitigation across portfolio and counterparty levels.',
      metrics: [
        { label: 'PPA Coverage', value: '85%+' },
        { label: 'Counterparty Diversity', value: '40+ partners' },
        { label: 'Avg Credit Rating', value: 'A-/A3' }
      ]
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      title: 'Robust Development Pipeline',
      content: 'Strong deal flow across all technologies and geographies.',
      metrics: [
        { label: 'Identified Opportunities', value: '45 GW' },
        { label: 'Active Development', value: '12 GW' },
        { label: 'Expected Deployment', value: '$8B+ (3yr)' }
      ]
    },
    {
      id: 'esg',
      label: 'ESG',
      title: 'ESG Leadership',
      content: 'Aligned with UN SDGs and global climate commitments.',
      metrics: [
        { label: 'CO2 Avoided (Annual)', value: '2.8M tonnes' },
        { label: 'GRESB Rating', value: '5-Star' },
        { label: 'UN PRI Signatory', value: 'Yes' }
      ]
    }
  ]
};

export default async function InvestmentThesisServer() {
  try {
    await dbConnect();
    const homepage: any = await Homepage.findOne({}).lean();
    
    const investmentData = {
      eyebrowText: homepage?.investmentSection?.eyebrowText || defaultInvestmentData.eyebrowText,
      headline: homepage?.investmentSection?.headline || defaultInvestmentData.headline,
      bodyText: homepage?.investmentSection?.bodyText || defaultInvestmentData.bodyText,
      features: homepage?.investmentSection?.features || defaultInvestmentData.features,
      tabs: homepage?.investmentSection?.tabs || defaultInvestmentData.tabs
    };

    return <InvestmentThesisClient data={investmentData} />;
  } catch (error) {
    console.error('Error fetching investment data:', error);
    return <InvestmentThesisClient data={defaultInvestmentData} />;
  }
}
