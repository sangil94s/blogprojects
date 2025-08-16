import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import PostCategoryList from '@/components/Post/Main/PostCategoryList';
import PostList from '@/components/Post/Main/PostList';
import RecentPosts from '@/components/Post/Main/RecentPosts';
import { Button } from '@/components/ui/button';

import { getAllPosts } from '@/components/util/getAllPost';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="m-auto my-4 min-h-screen w-11/12 rounded-lg bg-white">
      <AllPostListCount count={posts?.length} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:basis-[80%]">
          <PostList posts={posts} />
          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              임시 - 더보기
            </Button>
          </div>
        </div>
        <aside className="m-1 w-full lg:sticky lg:top-24 lg:max-w-sm lg:basis-[15%]">
          <PostCategoryList />
          <RecentPosts />
        </aside>
      </div>

      {/* 추후 수정 예정 */}
    </div>
  );
}
