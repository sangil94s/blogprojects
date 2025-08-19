import { NextRequest, NextResponse } from 'next/server';
import { getPostsPage } from '@/components/util/getAllPost';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageSizeParam = searchParams.get('pageSize');
  const cursor = searchParams.get('cursor') ?? undefined;

  const pageSize = Number(pageSizeParam ?? '1');

  const data = await getPostsPage({ pageSize, startCursor: cursor });

  return NextResponse.json(data);
}
