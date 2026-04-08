import dbConnect from '@/lib/mongodb';
import { Navigation as NavigationModel } from '@/models/Navigation';
import NavigationClient from './NavigationClient';

export default async function Navigation() {
  await dbConnect();
  
  let navigation: any = await NavigationModel.findOne({}).lean();
  
  if (!navigation) {
    navigation = {
      logo: {
        imageUrl: '/images/heliosngrlogo.png',
        altText: 'Helios NRG'
      },
      siteTitle: 'Helios NRG',
      primary: [
        { label: 'About', href: '/about', order: 1 },
        { label: 'Capabilities', href: '/capabilities', order: 2 },
        { label: 'Portfolio', href: '/portfolio', order: 3 },
        { label: 'Insights', href: '/insights', order: 4 },
        { label: 'Investors', href: '/investors', order: 5 },
        { label: 'Contact', href: '/contact', order: 6 }
      ],
      utilityRight: [
        { label: 'Login', href: '/admin/login', variant: 'ghost' },
        { label: 'Request Meeting', href: '/contact', variant: 'primary' }
      ]
    };
  }

  // Ensure logo and siteTitle exist (for backward compatibility)
  if (!navigation.logo) {
    navigation.logo = {
      imageUrl: '/images/heliosngrlogo.png',
      altText: 'Helios NRG'
    };
  }
  if (!navigation.siteTitle) {
    navigation.siteTitle = 'Helios NRG';
  }

  // Convert MongoDB objects to plain objects
  const plainNavigation = {
    logo: navigation.logo ? {
      imageUrl: navigation.logo.imageUrl,
      altText: navigation.logo.altText
    } : { imageUrl: '/images/heliosngrlogo.png', altText: 'Helios NRG' },
    siteTitle: navigation.siteTitle || 'Helios NRG',
    primary: navigation.primary?.map((item: any) => ({
      label: item.label,
      href: item.href,
      order: item.order
    })) || [],
    utilityRight: navigation.utilityRight?.map((item: any) => ({
      label: item.label,
      href: item.href,
      variant: item.variant
    })) || []
  };

  return <NavigationClient navigation={plainNavigation} />;
}
