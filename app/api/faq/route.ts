import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const faq = await FAQ.create(body);
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const faqs = await FAQ.find({ status: 'published' }).sort({ category: 1, order: 1 });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}
