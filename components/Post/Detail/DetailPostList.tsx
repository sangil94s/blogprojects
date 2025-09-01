'use client';
import Loading from '@/app/Loading';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Link, MoveLeft, MoveRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function DetailPostList() {
  const params = useParams();
  const PostId = Number(params.id);
  const router = useRouter();

  const handleCopyLink = () => {
    try {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      alert('주소 복사에 성공했어요!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

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

  const { data: allPosts, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      const res = await fetch('/api/posts/all');
      if (!res.ok) throw new Error('전체 글 호출 실패');
      return res.json() as Promise<Array<{ postId: number }>>;
    },
  });

  const handlePrevPost = () => {
    if (!allPosts || !Array.isArray(allPosts)) return alert('이전 글을 찾을 수 없어요.');
    const currentIndex = allPosts.findIndex((p: { postId: number }) => p.postId === PostId);
    if (currentIndex === -1) return alert('이전 글을 찾을 수 없어요.');
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) return alert('이전 글이 없어요.');
    const targetId = allPosts[prevIndex].postId;
    router.push(`/posts/${targetId}`);
  };

  const handleNextPost = () => {
    if (!allPosts || !Array.isArray(allPosts)) return alert('다음 글을 찾을 수 없어요.');
    const currentIndex = allPosts.findIndex((p: { postId: number }) => p.postId === PostId);
    if (currentIndex === -1) return alert('다음 글을 찾을 수 없어요.');
    const nextIndex = currentIndex + 1;
    if (nextIndex >= allPosts.length) return alert('지금 글이 마지막입니다.');
    const targetId = allPosts[nextIndex].postId;
    router.push(`/posts/${targetId}`);
  };

  if (isLoading) return <Loading />;
  if (error || !post) return <p>에러 발생 또는 게시글 없음</p>;

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <article className="space-y-8">
            {post?.category.map((itemX: string, idx: number) => (
              <div className="flex items-center space-x-2" key={idx}>
                <Badge variant="secondary">{itemX}</Badge>
              </div>
            ))}

            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{post?.title}</h1>

            <p className="text-xl">{post?.desc}</p>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post?.date}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center space-x-1"
                  onClick={handleCopyLink}
                >
                  <Link className="h-4 w-4" />
                  <span>링크 복사</span>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none border-t-2 border-slate-100 py-4">
              <ReactMarkdown>{post?.markdown.parent}</ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <h1 className="flex cursor-pointer items-center p-4 font-bold" onClick={handlePrevPost}>
          <MoveLeft className="mr-2 h-4 w-4" />
          이전 글
        </h1>
        <h1 className="flex cursor-pointer items-center p-4 font-bold" onClick={handleNextPost}>
          다음 글
          <MoveRight className="ml-2 h-4 w-4" />
        </h1>
      </div>
    </>
  );
}
