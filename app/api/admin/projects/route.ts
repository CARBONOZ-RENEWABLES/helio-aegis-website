import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const technology = searchParams.get('technology');
    const search = searchParams.get('search');

    const query: any = {};
    if (status) query.status = status;
    if (technology) query['basicInfo.technology'] = technology;
    if (search) {
      query['basicInfo.name'] = { $regex: search, $options: 'i' };
    }

    const projects = await Project.find(query)
      .sort({ 'basicInfo.order': 1, updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    return NextResponse.json({ 
      success: true, 
      data: projects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
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

    const project = await Project.create({
      ...data,
      lastEditedBy: session.user.email,
    });

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'create',
      module: 'projects',
      recordId: project._id.toString(),
      recordLabel: project.basicInfo.name
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
