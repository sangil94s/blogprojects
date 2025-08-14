import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import PostCategoryList from '@/components/Post/Main/PostCategoryList';
import PostList from '@/components/Post/Main/PostList';
import RecentPosts from '@/components/Post/Main/RecentPosts';

import { getAllPosts } from '@/components/util/getAllPost';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="m-auto my-4 min-h-screen w-11/12 rounded-lg bg-white">
      <AllPostListCount count={posts?.length} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:basis-[80%]">
          <PostList posts={posts} />
          <h1 className="my-2 text-center text-xl font-bold text-red-600">
            추후 더보기 버튼 or 컴포넌트 배치 지역
          </h1>
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
