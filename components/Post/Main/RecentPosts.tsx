import { getAllPosts } from '@/components/util/getAllPost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function RecentPosts() {
  const posts = await getAllPosts();
  const recentPosts = posts.filter(post =>
    dayjs(post.CreateDate).isAfter(dayjs().subtract(7, 'day')),
  );

  return (
    <aside className="my-2 space-y-2 m-auto w-11/12 lg:w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">최근 업로드된 글</CardTitle>
        </CardHeader>
        {recentPosts.length === 0 ? (
          <h1 className="text-center text-xl font-bold text-red-600">최근 작성 글 없음</h1>
        ) : (
          <CardContent>
            <ul className="space-y-1">
              {recentPosts.map(post => (
                <Link key={post.postId} href={`/posts/${post.postId}`}>
                  <li key={post.postId}>
                    <p className="font-semibold">{post.PostTitle}</p>
                    <p className="text-sm text-gray-500">{post.CreateDate}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
    </aside>
  );
}
