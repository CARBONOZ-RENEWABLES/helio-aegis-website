import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Capabilities from '@/models/Capabilities';

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const updated = await Capabilities.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update capabilities' }, { status: 500 });
  }
}
