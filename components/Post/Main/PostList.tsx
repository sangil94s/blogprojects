// 아마도 전체 글 리스트를 보여주는 목적
import { getAllPosts } from '@/components/util/getAllPost';
import Link from 'next/link';

export default async function PostList() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col justify-center gap-1">
      {posts?.map(item => (
        <Link key={item.postId} href="https://www.naver.com">
          <div className="m-auto w-11/12 border-y-2 border-slate-200">
            <h1 className="py-2 text-xl font-bold">{item.PostTitle}</h1>
            <p>{item.SmallDescription}</p>
            {item.Category.map(categoryItem => (
              <p key={categoryItem}>{categoryItem}</p>
            ))}
            <p className="py-2 text-sm font-bold text-slate-300">{item.CreateDate}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
