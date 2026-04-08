import dbConnect from '@/lib/mongodb';
import Footer from '@/models/Footer';
import FooterClient from './FooterClient';

export default async function FooterServer() {
  await dbConnect();
  
  const footerData = await Footer.findOne({}).lean();

  const defaultData = {
    logo: {
      imageUrl: '/images/heliosngrlogo.png',
      altText: 'Helios NRG'
    },
    newsletter: {
      headline: 'Stay current on energy markets.',
      subheadline: 'Monthly insights, market data, and policy updates.',
      buttonText: 'Subscribe',
      successMessage: '✓ Subscribed'
    },
    brand: {
      name: 'Helios NRG',
      tagline: 'Structuring the clean energy future through integrated project management and energy finance.',
      socialLinks: [
        { platform: 'LinkedIn', icon: 'in', url: '#', order: 1 },
        { platform: 'Twitter', icon: 'tw', url: '#', order: 2 }
      ]
    },
    linkColumns: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Leadership', href: '/about#leadership' },
          { label: 'Careers', href: '/careers' },
          { label: 'Press', href: '/press' }
        ]
      },
      {
        title: 'Capabilities',
        links: [
          { label: 'Project Development', href: '/capabilities/project-development' },
          { label: 'Energy Finance', href: '/capabilities/energy-finance' },
          { label: 'Asset Management', href: '/capabilities/asset-management' },
          { label: 'Technology', href: '/capabilities/technology' }
        ]
      },
      {
        title: 'Investors',
        links: [
          { label: 'Investment Thesis', href: '/investors' },
          { label: 'Fund Structures', href: '/investors#funds' },
          { label: 'Data Room', href: '/investors/data-room' },
          { label: 'Contact IR', href: '/contact?type=investor' }
        ]
      }
    ],
    contact: {
      title: 'Contact',
      items: [
        { label: 'General', value: 'info@heliosnrg.eu', type: 'email' },
        { label: 'Investors', value: 'investors@heliosnrg.eu', type: 'email' },
        { label: 'Phone', value: '+1 (555) 0123', type: 'phone' }
      ]
    },
    certifications: [
      { icon: '✓', label: 'ISO 14001' },
      { icon: '⭐', label: 'GRESB 5-Star' },
      { icon: '🌍', label: 'UN PRI' },
      { icon: '📋', label: 'TCFD Aligned' }
    ],
    legal: {
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Legal Disclaimers', href: '/disclaimers' },
        { label: 'Cookie Settings', href: '#' }
      ],
      copyrightText: '© 2025 Helios NRG Capital Partners LLC. All rights reserved. Past performance is not indicative of future results. This website is for informational purposes only and does not constitute an offer to sell or solicitation of an offer to buy any securities.'
    }
  };

  const data = {
    logo: footerData?.logo || defaultData.logo,
    newsletter: footerData?.newsletter || defaultData.newsletter,
    brand: footerData?.brand || defaultData.brand,
    linkColumns: footerData?.linkColumns || defaultData.linkColumns,
    contact: footerData?.contact || defaultData.contact,
    certifications: footerData?.certifications || defaultData.certifications,
    legal: footerData?.legal || defaultData.legal
  };

  // Convert to plain object
  const plainData = JSON.parse(JSON.stringify(data));

  return <FooterClient data={plainData} />;
}
