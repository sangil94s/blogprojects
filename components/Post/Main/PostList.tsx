// 아마도 전체 글 리스트를 보여주는 목적
import Nodata from '@/components/Layout/Nodata';
import Link from 'next/link';
import { PostTypes } from '@/types/Infomation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

export default function PostList({ posts }: PostTypes) {
  return (
    <div className="mx-2 w-full space-y-4">
      {posts?.length > 0 ? (
        posts?.map(item => (
          <Link key={item.postId} href={`/posts/${item.postId}`}>
            <Card
              key={item.postId}
              className="m-auto my-2 w-11/12 bg-white transition-shadow hover:bg-slate-100 hover:shadow-lg lg:w-full"
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
                <CardDescription className="m-2 text-base">{item.SmallDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <div className="flex items-end space-x-2">
                    <Tag className="text-muted-foreground my-1 h-4 w-4" />
                    <div className="flex space-x-1">
                      {item.Skills.slice(0, 2).map(SkillTag => (
                        <Badge key={SkillTag} variant="outline" className="text-xs">
                          {SkillTag}
                        </Badge>
                      ))}
                      {item.Skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          ...
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <Nodata />
          <p className="text-muted-foreground mt-4">선택한 카테고리에 해당하는 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
