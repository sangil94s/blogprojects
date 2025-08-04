// 전체 글 이 몇개인지 카운트로 보여주는 목적
import { getAllPosts } from '@/components/util/getAllPost';

export default async function AllPostListCount() {
  const posts = await getAllPosts();

  return (
    <>
      <h1 className="py-4 text-center text-2xl font-bold">
        카테고리의 포스트 수 : {posts?.length}
      </h1>
    </>
  );
}
