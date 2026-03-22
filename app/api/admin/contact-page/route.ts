import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import ContactPage from '@/models/ContactPage';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    await dbConnect();
    const contactPage = await ContactPage.findOne();
    return NextResponse.json({ success: true, data: contactPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contact page' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const contactPage = await ContactPage.findOneAndUpdate(
      {},
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'update',
      module: 'contact-page',
      recordId: contactPage._id.toString(),
      recordLabel: 'Contact Page'
    });

    return NextResponse.json({ success: true, data: contactPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update contact page' }, { status: 500 });
  }
}
