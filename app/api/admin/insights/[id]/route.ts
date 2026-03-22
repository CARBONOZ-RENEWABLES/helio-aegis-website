import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import { logAudit } from '@/lib/audit';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const insight = await Insight.findById(params.id);
    
    if (!insight) {
      return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: insight });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch insight' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const updateData: any = {
      ...data,
      lastEditedBy: session.user.email,
      updatedAt: new Date()
    };

    const existingInsight = await Insight.findById(params.id);
    if (data.status === 'published' && existingInsight?.status !== 'published') {
      updateData.publishedAt = new Date();
    }

    const insight = await Insight.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!insight) {
      return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
    }

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'update',
      module: 'insights',
      recordId: insight._id.toString(),
      recordLabel: insight.title
    });

    return NextResponse.json({ success: true, data: insight });
  } catch (error) {
    console.error('Update insight error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update insight' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user.permissions.canDeleteContent) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const insight = await Insight.findByIdAndUpdate(
      params.id,
      { status: 'archived', lastEditedBy: session.user.email },
      { new: true }
    );

    if (!insight) {
      return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
    }

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'delete',
      module: 'insights',
      recordId: insight._id.toString(),
      recordLabel: insight.title
    });

    return NextResponse.json({ success: true, data: insight });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete insight' }, { status: 500 });
  }
}
