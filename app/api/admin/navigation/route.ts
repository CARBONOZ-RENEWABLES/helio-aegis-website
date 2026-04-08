import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Navigation } from '@/models/Navigation';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let navigation = await Navigation.findOne({});
    
    if (!navigation) {
      navigation = await Navigation.create({
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
        ],
        lastEditedBy: 'system'
      });
    }
    
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    
    const navigation = await Navigation.findOneAndUpdate(
      {},
      {
        ...data,
        lastEditedBy: session.user.email,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error updating navigation:', error);
    return NextResponse.json({ error: 'Failed to update navigation' }, { status: 500 });
  }
}
