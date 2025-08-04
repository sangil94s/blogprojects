import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import PostList from '@/components/Post/Main/PostList';
import { getAllPosts } from '@/components/util/getAllPost';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="m-auto my-2 min-h-screen w-11/12 rounded-lg bg-white">
      <AllPostListCount count={posts?.length} />
      <PostList posts={posts} />
    </div>
  );
}
