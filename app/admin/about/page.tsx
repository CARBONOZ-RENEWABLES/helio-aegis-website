import dbConnect from '@/lib/mongodb';
import AboutPage from '@/models/AboutPage';
import AboutPageEditorForm from '@/components/admin/AboutPageEditorForm';

export default async function AboutPageEditorPage() {
  await dbConnect();
  
  let aboutPage = await AboutPage.findOne({}).lean();
  
  if (!aboutPage) {
    const newAboutPage = await AboutPage.create({
      hero: {
        eyebrowText: 'About Helio Aegis',
        headlineLine1: 'Structuring the',
        headlineLine2: 'Clean Energy Future',
        subheadline: 'Since 2012, Helio Aegis has been at the forefront of renewable energy project management and energy finance, structuring and delivering transformational infrastructure across North America, Europe, and Africa.'
      },
      stats: [
        { label: 'Years Active', value: '13+', order: 1 },
        { label: 'Capital Deployed', value: '$12.4B', order: 2 },
        { label: 'Projects Delivered', value: '340+', order: 3 },
        { label: 'Team Members', value: '150+', order: 4 }
      ],
      story: {
        headline: 'Our Story',
        paragraphs: [
          'Helio Aegis was founded on a simple premise: the energy transition requires more than capital. It requires integrated expertise in project development, energy finance, and institutional-grade execution.',
          "Over the past decade, we've structured and delivered $12.4B in renewable infrastructure across 340+ projects, serving institutional investors, project developers, and government agencies worldwide.",
          'Our success is built on deep sector expertise, proprietary deal sourcing, and an unwavering commitment to delivering results for our partners.'
        ]
      },
      mission: {
        headline: 'Our Mission',
        text: 'To accelerate the global energy transition by combining deep sector expertise with proprietary technology, enabling institutional capital to deploy at scale in renewable infrastructure.'
      },
      values: {
        headline: 'Core Values',
        items: [
          'Authoritative expertise backed by data and results',
          'Institutional-grade governance and risk management',
          'Integrated approach to project development and finance',
          'Commitment to ESG and climate impact',
          'Long-term partnership mentality'
        ]
      },
      offices: [
        {
          region: 'North America',
          office: 'New York, USA',
          team: '45+ professionals',
          focus: 'Solar, Wind, Storage',
          order: 1
        },
        {
          region: 'Europe',
          office: 'London, UK',
          team: '35+ professionals',
          focus: 'Offshore Wind, Solar',
          order: 2
        },
        {
          region: 'MENA',
          office: 'Dubai, UAE',
          team: '25+ professionals',
          focus: 'Solar, Green Hydrogen',
          order: 3
        }
      ],
      esg: {
        headline: 'ESG & Climate Commitment',
        subheadline: 'We are committed to advancing the UN Sustainable Development Goals and accelerating the global energy transition.',
        sections: [
          {
            title: 'Climate Impact',
            metrics: [
              { label: 'CO2 Avoided (Annual)', value: '2.8M tonnes' },
              { label: 'Renewable Capacity', value: '18.2 GW' }
            ]
          },
          {
            title: 'Certifications',
            metrics: [
              { label: 'GRESB Rating', value: '5-Star' },
              { label: 'UN PRI Signatory', value: 'Yes' }
            ]
          }
        ]
      },
      status: 'published',
      lastEditedBy: 'system'
    });
    aboutPage = await AboutPage.findOne({}).lean();
  }

  return <AboutPageEditorForm aboutPage={JSON.parse(JSON.stringify(aboutPage))} />;
}
