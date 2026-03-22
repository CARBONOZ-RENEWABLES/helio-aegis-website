import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { logAudit } from '@/lib/audit';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id);
    
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 });
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

    const project = await Project.findByIdAndUpdate(
      params.id,
      { ...data, lastEditedBy: session.user.email, updatedAt: new Date() },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'update',
      module: 'projects',
      recordId: project._id.toString(),
      recordLabel: project.basicInfo.name
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
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
    const project = await Project.findByIdAndUpdate(
      params.id,
      { status: 'archived', lastEditedBy: session.user.email },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'delete',
      module: 'projects',
      recordId: project._id.toString(),
      recordLabel: project.basicInfo.name
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
