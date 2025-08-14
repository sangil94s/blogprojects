import DetailPostList from '@/components/Post/Detail/DetailPostList';
import { getDetailPostById } from '@/components/util/DetailPost';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getDetailPostById(Number(id));

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.title,
    description: post.desc,
  };
}

export default function page() {
  return (
    <div className="m-auto my-4 min-h-screen w-10/12 rounded-lg bg-white">
      <DetailPostList />
    </div>
  );
}
