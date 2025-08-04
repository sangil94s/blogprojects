// Post가 없을때 등장하는 부분
import { X } from 'lucide-react';

export default function Nodata() {
  return (
    <div className="flex flex-row items-center justify-center">
      <X className="text-red-600" />
      <h1 className="px-2 text-center text-xl font-bold text-red-600">데이터가 없습니다.</h1>
    </div>
  );
}
