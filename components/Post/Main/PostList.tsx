// 아마도 전체 글 리스트를 보여주는 목적
import Nodata from '@/components/Layout/Nodata';
import Link from 'next/link';
import { BlogAllPostType } from '@/types/Infomation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

interface PostTypes {
  posts: BlogAllPostType[];
}

export default async function PostList({ posts }: PostTypes) {
  return (
    <div className="mx-2 w-full space-y-4">
      {posts?.length > 0 ? (
        posts?.map(item => (
          <Link key={item.postId} href={`/posts/${item.postId}`}>
            <Card
              key={item.postId}
              className="m-auto w-11/12 lg:w-full bg-white transition-shadow hover:bg-slate-100 hover:shadow-lg"
            >
              <CardHeader>
                <div className="m-1 flex items-center justify-between">
                  {item.Category.map(categoryItem => (
                    <Badge className="m-1" key={categoryItem}>
                      {categoryItem}
                    </Badge>
                  ))}
                  <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.CreateDate}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="hover:text-primary mx-2 cursor-pointer text-xl">
                  {item.PostTitle}
                </CardTitle>
                <CardDescription className="mx-2 text-base leading-relaxed">
                  {item.SmallDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <div className="flex items-end space-x-2">
                    <Tag className="text-muted-foreground my-1 h-4 w-4" />
                    <div className="flex space-x-1">
                      {item.Skills.map(SkillTag => (
                        <Badge key={SkillTag} variant="outline" className="text-xs">
                          {SkillTag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <Nodata />
      )}
      {/* 추후 더보기 or 페이지네이션 or 무한스크롤 배치 예정 */}
    </div>
  );
}
