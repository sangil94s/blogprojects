import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// 카테고리 필터 목적

export default function PostCategoryList() {
  return (
    <aside className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">카테고리-필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h1>항목 1</h1>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
