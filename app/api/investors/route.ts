import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import InvestorsPage from '@/models/InvestorsPage';

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const updated = await InvestorsPage.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update investors page' }, { status: 500 });
  }
}
