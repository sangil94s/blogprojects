import { NextResponse } from 'next/server';
import { getAllPosts } from '@/components/util/getAllPost';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
