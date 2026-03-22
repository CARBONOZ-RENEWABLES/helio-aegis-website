import dbConnect, { DEMO_MODE } from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import PartnersCredentialsClient from './PartnersCredentialsClient';

const defaultPartnersData = {
  headline: 'Trusted by leading institutions',
  institutions: [
    { shortName: 'GS', fullName: 'Goldman Sachs', logo: '', order: 1 },
    { shortName: 'JPM', fullName: 'JP Morgan', logo: '', order: 2 },
    { shortName: 'WF', fullName: 'Wells Fargo', logo: '', order: 3 },
    { shortName: 'RB', fullName: 'Rabobank', logo: '', order: 4 },
    { shortName: 'ING', fullName: 'ING', logo: '', order: 5 },
    { shortName: 'MUFG', fullName: 'MUFG', logo: '', order: 6 },
    { shortName: 'BEP', fullName: 'Brookfield', logo: '', order: 7 },
    { shortName: 'ORSTED', fullName: 'Ørsted', logo: '', order: 8 }
  ],
  certifications: [
    { icon: '✓', label: 'ISO 14001', order: 1 },
    { icon: '⭐', label: 'GRESB 5-Star', order: 2 },
    { icon: '🌍', label: 'UN PRI Signatory', order: 3 }
  ]
};

export default async function PartnersCredentialsServer() {
  try {
    if (!DEMO_MODE) { await dbConnect(); }
    const homepage: any = DEMO_MODE ? null : await Homepage.findOne({}).lean();
    
    const partnersData = {
      headline: homepage?.partnersSection?.headline || defaultPartnersData.headline,
      institutions: homepage?.partnersSection?.institutions || defaultPartnersData.institutions,
      certifications: homepage?.partnersSection?.certifications || defaultPartnersData.certifications
    };

    return <PartnersCredentialsClient data={partnersData} />;
  } catch (error) {
    console.error('Error fetching partners data:', error);
    return <PartnersCredentialsClient data={defaultPartnersData} />;
  }
}
