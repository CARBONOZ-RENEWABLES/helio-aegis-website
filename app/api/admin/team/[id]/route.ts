import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { logAudit } from '@/lib/audit';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const teamMember = await TeamMember.findByIdAndUpdate(
      params.id,
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true }
    );

    if (!teamMember) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    try {
      await logAudit({
        adminEmail: session.user.email,
        adminName: session.user.name,
        action: 'update',
        module: 'team',
        recordId: teamMember._id.toString(),
        recordLabel: teamMember.name
      });
    } catch (auditError) {
      console.error('Audit log error:', auditError);
    }

    return NextResponse.json({ success: true, data: teamMember });
  } catch (error) {
    console.error('Team member update error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update team member' 
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const teamMember = await TeamMember.findByIdAndDelete(params.id);

    if (!teamMember) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    try {
      await logAudit({
        adminEmail: session.user.email,
        adminName: session.user.name,
        action: 'delete',
        module: 'team',
        recordId: params.id,
        recordLabel: teamMember.name
      });
    } catch (auditError) {
      console.error('Audit log error:', auditError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Team member deletion error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete team member' 
    }, { status: 500 });
  }
}
