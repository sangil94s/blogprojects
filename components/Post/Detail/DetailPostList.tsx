'use client';
import Loading from '@/app/Loading';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function DetailPostList() {
  const params = useParams();
  const PostId = Number(params.id);
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['postDetail', PostId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${PostId}`);
      if (!res.ok) throw new Error('글 호출 실패');
      return res.json();
    },
    enabled: !!PostId,
  });

  if (isLoading) return <Loading />;
  if (error || !post) return <p>에러 발생 또는 게시글 없음</p>;

  return <></>;
}
