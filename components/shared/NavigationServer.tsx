import dbConnect from '@/lib/mongodb';
import { Navigation as NavigationModel } from '@/models/Navigation';
import NavigationClient from './NavigationClient';

export default async function Navigation() {
  await dbConnect();
  
  let navigation: any = await NavigationModel.findOne({}).lean();
  
  if (!navigation) {
    navigation = {
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

  return <NavigationClient navigation={navigation} />;
}
