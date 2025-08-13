import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// 카테고리 기준 필터링, 선택된 부분 배경색상 변경 예정

export default function PostCategoryList() {
  return (
    <aside className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">카테고리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h1 className="cursor-pointer font-bold">전체</h1>
            <h1 className="cursor-pointer font-bold">프론트엔드</h1>
            <h1 className="cursor-pointer font-bold">백엔드</h1>
            <h1 className="cursor-pointer font-bold">배포</h1>
            <h1 className="cursor-pointer font-bold">에러 - 시행착오</h1>
            <h1 className="cursor-pointer font-bold">회고</h1>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
