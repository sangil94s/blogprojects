'use client';

import { useCallback, useState, useMemo } from 'react';
import PostList from './PostList';
import CategoryFilter from './CategoryFilter';
import { Button } from '@/components/ui/button';
import type {
  BlogAllPostType,
  MorePostsClientProps,
  CategoryFilter as CategoryFilterType,
} from '@/types/Infomation';
import { ChevronDown } from 'lucide-react';
import { filterPostsByCategory } from '@/components/util/getAllPost';

export default function MorePostsClient({
  initialPosts,
  nextPageToken,
  hasMorePages,
  pageSize = 1,
}: MorePostsClientProps) {
  const [posts, setPosts] = useState<BlogAllPostType[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(nextPageToken);
  const [hasMore, setHasMore] = useState<boolean>(hasMorePages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('전체');

  // 필터링된 포스트 계산
  const filteredPosts = useMemo(() => {
    return filterPostsByCategory(posts, selectedCategory);
  }, [posts, selectedCategory]);

  const handleCategoryChange = (category: CategoryFilterType) => {
    setSelectedCategory(category);
  };

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) {
      alert('더 불러올 글 이 없습니다!');
      return;
    }

    try {
      setIsLoading(true);
      const url = new URL('/api/posts', window.location.origin);
      url.searchParams.set('pageSize', String(pageSize));
      if (cursor) url.searchParams.set('cursor', cursor);

      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (!res.ok) throw new Error('failed to fetch');
      const data: {
        posts: BlogAllPostType[];
        nextCursor: string | null;
        hasMore: boolean;
      } = await res.json();

      if (!data.posts || data.posts.length === 0) {
        setHasMore(false);
        alert('더 불러올 글 이 없습니다!');
        return;
      }

      setPosts(prev => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);

      if (!data.hasMore) {
        alert('마지막 글 입니다!');
      }
    } catch (e) {
      console.error(e);
      alert('글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, pageSize]);

  return (
    <div className="w-full">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        posts={posts}
      />
      <PostList posts={filteredPosts} />
      <div className="flex justify-center">
        <Button
          className="w-6/12 cursor-pointer"
          variant="outline"
          size="lg"
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          <ChevronDown />
          {isLoading ? '불러오는 중...' : '더보기'}
        </Button>
      </div>
    </div>
  );
}
