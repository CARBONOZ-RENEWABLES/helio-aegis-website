import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const faq = await FAQ.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await FAQ.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
