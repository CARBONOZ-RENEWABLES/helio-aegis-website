import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    await dbConnect();
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: teamMembers });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const teamMember = await TeamMember.create({
      ...data,
      lastEditedBy: session.user.email,
      updatedAt: new Date()
    });

    try {
      await logAudit({
        adminEmail: session.user.email,
        adminName: session.user.name,
        action: 'create',
        module: 'team',
        recordId: teamMember._id.toString(),
        recordLabel: teamMember.name
      });
    } catch (auditError) {
      console.error('Audit log error:', auditError);
    }

    return NextResponse.json({ success: true, data: teamMember });
  } catch (error) {
    console.error('Team member creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create team member' 
    }, { status: 500 });
  }
}
