// 전체 글 이 몇개인지 카운트로 보여주는 목적
interface CountType {
  count: number;
}
export default async function AllPostListCount({ count }: CountType) {
  return (
    <>
      <h1 className="py-4 text-center text-2xl font-bold">카테고리의 포스트 수 : {count}</h1>
    </>
  );
}
