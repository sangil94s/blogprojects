// 위로가기 버튼 초안
import { ArrowUp } from 'lucide-react';

export default function Top() {
  return (
    <>
      <button
        className="fixed right-6 bottom-6 z-50 cursor-pointer rounded-full bg-white p-3 text-black shadow-md transition-colors hover:bg-slate-200"
        aria-label="맨 위로 이동"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
