import dbConnect from '@/lib/mongodb';
import { Navigation } from '@/models/Navigation';
import NavigationEditorForm from '@/components/admin/NavigationEditorForm';

export default async function NavigationPage() {
  await dbConnect();
  
  let navigation = await Navigation.findOne({}).lean();
  
  if (!navigation) {
    navigation = await Navigation.create({
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
      ],
      lastEditedBy: 'system'
    });
    navigation = await Navigation.findOne({}).lean();
  }

  return <NavigationEditorForm navigation={JSON.parse(JSON.stringify(navigation))} />;
}
