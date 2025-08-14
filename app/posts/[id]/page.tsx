import DetailPostList from '@/components/Post/Detail/DetailPostList';

// 아마도 여기는 글 상세 페이지 역할

export default function page() {
  return (
    <div className="m-auto my-4 min-h-screen w-10/12 rounded-lg bg-white">
      <DetailPostList />
    </div>
  );
}
