// 아마도 전체 글 리스트를 보여주는 목적
import Nodata from '@/components/Layout/Nodata';
import Link from 'next/link';
import { BlogAllPostType } from '@/types/Infomation';
import { Badge } from '@/components/ui/badge';
interface PostTypes {
  posts: BlogAllPostType[];
}

export default async function PostList({ posts }: PostTypes) {
  return (
    <div className="flex flex-col justify-center gap-1">
      {posts?.length > 0 ? (
        posts?.map(item => (
          <Link key={item.postId} href={`/posts/${item.PostTitle}`}>
            <div className="m-auto w-11/12 border-y-2 border-slate-200 transition-colors duration-300 hover:bg-slate-100">
              <h1 className="px-2 py-1 text-xl font-bold">{item.PostTitle}</h1>
              <p className="px-2 py-1">{item.SmallDescription}</p>
              {item.Category.map(categoryItem => (
                <Badge className="m-2" key={categoryItem}>
                  {categoryItem}
                </Badge>
              ))}
              <p className="px-2 py-1 text-sm font-bold text-slate-300">{item.CreateDate}</p>
            </div>
          </Link>
        ))
      ) : (
        <Nodata />
      )}
    </div>
  );
}
