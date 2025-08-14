'use client';
import Loading from '@/app/Loading';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Calendar } from 'lucide-react';

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

  console.log(post);

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <article className="space-y-8">
            {post?.category.map((itemX: string, idx: number) => (
              <div className="flex items-center space-x-2" key={idx}>
                <Badge variant="outline">{itemX}</Badge>
              </div>
            ))}

            <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl">
              {post?.title}
            </h1>

            <p className="text-muted-foreground text-xl leading-relaxed">{post?.desc}</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post?.date}</span>
                </div>
              </div>
            </div>

            <div>
              <p>{post?.markdown.parent}</p>

              {/* <blockquote>
                추후 사용 가능성
              </blockquote> */}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
