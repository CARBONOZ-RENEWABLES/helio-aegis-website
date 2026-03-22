import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Footer from '@/models/Footer';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    await dbConnect();
    const footer = await Footer.findOne();
    return NextResponse.json({ success: true, data: footer });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch footer' }, { status: 500 });
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

    const footer = await Footer.findOneAndUpdate(
      {},
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    try {
      await logAudit({
        adminEmail: session.user.email,
        adminName: session.user.name,
        action: 'update',
        module: 'footer',
        recordId: footer._id.toString(),
        recordLabel: 'Footer'
      });
    } catch (auditError) {
      console.error('Audit log error:', auditError);
    }

    return NextResponse.json({ success: true, data: footer });
  } catch (error) {
    console.error('Footer update error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update footer' 
    }, { status: 500 });
  }
}
