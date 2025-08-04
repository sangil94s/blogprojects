import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import PostList from '@/components/Post/Main/PostList';

export default function Home() {
  return (
    <div className="m-auto my-2 min-h-screen w-11/12 rounded-lg bg-white">
      <AllPostListCount />
      <PostList />
    </div>
  );
}
