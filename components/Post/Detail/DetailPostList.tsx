'use client';
import Loading from '@/app/Loading';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Calendar, Link } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function DetailPostList() {
  const params = useParams();
  const PostId = Number(params.id);

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
        <h1 className="cursor-pointer p-4 font-bold">이전 글</h1>
        <h1 className="cursor-pointer p-4 font-bold">다음 글</h1>
      </div>
    </>
  );
}
