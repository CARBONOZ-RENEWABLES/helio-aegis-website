import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (category) query.category = category;

    const insights = await Insight.find(query)
      .sort({ publishedAt: -1, updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Insight.countDocuments(query);

    return NextResponse.json({ 
      success: true, 
      data: insights,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch insights' }, { status: 500 });
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

    const insightData: any = {
      ...data,
      lastEditedBy: session.user.email,
    };

    if (data.status === 'published' && !data.publishedAt) {
      insightData.publishedAt = new Date();
    }

    const insight = await Insight.create(insightData);

    await logAudit({
      adminEmail: session.user.email,
      adminName: session.user.name,
      action: 'create',
      module: 'insights',
      recordId: insight._id.toString(),
      recordLabel: insight.title
    });

    return NextResponse.json({ success: true, data: insight }, { status: 201 });
  } catch (error) {
    console.error('Create insight error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create insight' }, { status: 500 });
  }
}
