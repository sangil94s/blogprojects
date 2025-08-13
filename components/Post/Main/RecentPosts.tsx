import { getAllPosts } from '@/components/util/getAllPost';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function RecentPosts() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 3); 

  return (
    <aside className="space-y-2 my-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">최근 업로드된 글</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {recent.map(post => (
              <li key={post.postId}>
                <p className="font-semibold">{post.PostTitle}</p>
                <p className="text-sm text-gray-500">{post.CreateDate}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
