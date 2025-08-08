import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import PostCategoryList from '@/components/Post/Main/PostCategoryList';
import PostList from '@/components/Post/Main/PostList';

import { getAllPosts } from '@/components/util/getAllPost';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="m-auto my-4 min-h-screen w-11/12 rounded-lg bg-white">
      <h1 className="text-center text-xl font-bold text-red-600">검색, 필터 추후 시도 예정</h1>
      <AllPostListCount count={posts?.length} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:basis-[80%]">
          <PostList posts={posts} />
        </div>
        <aside className="m-1 w-full lg:sticky lg:top-24 lg:max-w-sm lg:basis-[15%]">
          <PostCategoryList />
        </aside>
      </div>

      {/* 추후 수정 예정 */}
    </div>
  );
}
