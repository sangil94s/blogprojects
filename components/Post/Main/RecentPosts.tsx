import { getAllPosts } from '@/components/util/getAllPost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import Link from 'next/link';
import Nodata from '@/components/Layout/Nodata';
import { Calendar } from 'lucide-react';

export default async function RecentPosts() {
  const posts = await getAllPosts();
  const recentPosts = posts.filter(post =>
    dayjs(post.CreateDate).isAfter(dayjs().subtract(7, 'day')),
  );

  return (
    <aside className="m-auto my-2 w-11/12 space-y-2 lg:w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">최근 업로드된 글</CardTitle>
        </CardHeader>
        {recentPosts.length === 0 ? (
          <Nodata />
        ) : (
          <CardContent>
            <ul className="space-y-1">
              {recentPosts.map(post => (
                <Link key={post.postId} href={`/posts/${post.postId}`}>
                  <li key={post.postId}>
                    <p className="py-2 font-semibold">
                      {post.PostTitle.length > 8
                        ? `${post.PostTitle.substring(0, 8)}...`
                        : post.PostTitle}
                    </p>
                    <div className="flex flex-row justify-start">
                      <Calendar className="mx-2 h-4 w-4" />
                      <p className="text-sm text-gray-500"> {post.CreateDate}</p>
                    </div>
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
