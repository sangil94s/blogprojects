'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import type { CategoryFilter, FilterProps } from '@/types/Infomation';

const categories: CategoryFilter[] = [
  '전체',
  'ETC',
  '프론트엔드',
  '백엔드',
  '배포',
  '에러-시행착오',
  '회고',
];

export default function CategoryFilter({ selectedCategory, onCategoryChange, posts }: FilterProps) {
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      전체: posts.length,
      ETC: 0,
      프론트엔드: 0,
      백엔드: 0,
      배포: 0,
      '에러-시행착오': 0,
      회고: 0,
    };

    posts.map(post => {
      post.Category.map(category => {
        if (category in counts) {
          counts[category as CategoryFilter]++;
        }
      });
      return undefined;
    });

    return counts;
  }, [posts]);

  return (
    <div className="m-6 flex flex-wrap gap-2">
      {categories.map(category => (
        <Badge
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
          onClick={() => onCategoryChange(category)}
        >
          {category} ({categoryCounts[category]})
        </Badge>
      ))}
    </div>
  );
}
