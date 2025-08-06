import { NextRequest, NextResponse } from 'next/server';
import { getDetailPostById } from '@/components/util/DetailPost';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const post = await getDetailPostById(Number((await params).id));

  return NextResponse.json(post);
}
