import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import AboutPage from '@/models/AboutPage';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    await dbConnect();
    const aboutPage = await AboutPage.findOne();
    return NextResponse.json({ success: true, data: aboutPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch about page' }, { status: 500 });
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

    const aboutPage = await AboutPage.findOneAndUpdate(
      {},
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    try {
      await logAudit({
        adminEmail: session.user.email,
        adminName: session.user.name,
        action: 'update',
        module: 'about-page',
        recordId: aboutPage._id.toString(),
        recordLabel: 'About Page'
      });
    } catch (auditError) {
      console.error('Audit log error:', auditError);
    }

    return NextResponse.json({ success: true, data: aboutPage });
  } catch (error) {
    console.error('About page update error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update about page' 
    }, { status: 500 });
  }
}
