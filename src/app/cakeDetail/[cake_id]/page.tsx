'use client';

import Image from 'next/image';
import { cakeLog, cakes } from '../../../../constants/mockData';
import { useParams, useRouter } from 'next/navigation';

export default function CakeDetail() {
  const router = useRouter();
  const { cake_id } = useParams();

  const onClickedOrder = () => {
    router.push(`/order/${cake_id}`);
  };

  return (
    <div className="w-full  mx-auto">
      {/* 상단 케이크 이미지 */}
      <div className="relative w-full h-64">
        <Image
          src="/images/cake-pick-cake2.svg"
          alt="케이크 이미지"
          fill
          className="object-cover rounded-b-lg"
        />
      </div>

      {/* 케이크 상세 정보 */}
      <div className="p-4">
        <h1 className="text-lg font-bold">고양이 케이크</h1>
        <p className="text-xl font-bold text-primary mt-2">40,000원</p>
        <p className="text-sm text-gray-500 mt-2">케이크 로그 100개</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="text-red-500">⭕</div>
          <div>
            <p className="text-sm">씨에이크 성수점</p>
            <p className="text-xs text-gray-500">
              서울특별시 마포구 독막로15길 17 1층
            </p>
          </div>
          <button className="text-sm text-primary">지도보기</button>
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded-md mt-4"
          onClick={onClickedOrder}
        >
          예약하기
        </button>
      </div>

      {/* 다른 디자인 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">다른 디자인</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {cakes.map((design) => (
            <div key={design.cake_id} className="min-w-[150px]">
              <div className="relative w-36 h-36">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{design.name}</p>
              <p className="text-sm text-gray-500">{design.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 케이크 로그 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">케이크 로그</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {cakeLog.map((log) => (
            <div key={log.id} className="min-w-[150px]">
              <div className="relative w-36 h-36">
                <Image
                  src={log.image}
                  alt={log.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{log.title}</p>
              <p className="text-sm text-gray-500">{log.user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
