import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    await dbConnect();
    const homepage = await Homepage.findOne();
    return NextResponse.json({ success: true, data: homepage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch homepage' }, { status: 500 });
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

    const homepage = await Homepage.findOneAndUpdate(
      {},
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'update',
      module: 'homepage',
      recordId: homepage._id.toString(),
      recordLabel: 'Homepage'
    });

    return NextResponse.json({ success: true, data: homepage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update homepage' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user.permissions.canPublish) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const homepage = await Homepage.findOneAndUpdate(
      {},
      { status: 'published', publishedAt: new Date(), lastEditedBy: session.user.email },
      { new: true }
    );

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'publish',
      module: 'homepage',
      recordId: homepage._id.toString(),
      recordLabel: 'Homepage'
    });

    return NextResponse.json({ success: true, data: homepage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to publish homepage' }, { status: 500 });
  }
}
