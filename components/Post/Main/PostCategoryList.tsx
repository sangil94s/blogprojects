'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 카테고리 기준 필터링, 선택된 부분 배경색상 변경 예정

export default function PostCategoryList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '프론트엔드', '백엔드', '배포', '에러 - 시행착오', '회고'];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <aside className="m-auto w-11/12 space-y-2 lg:w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">카테고리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map(category => (
              <h1
                key={category}
                className={`cursor-pointer rounded-md px-3 py-2 font-bold transition-colors ${
                  selectedCategory === category ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </h1>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
