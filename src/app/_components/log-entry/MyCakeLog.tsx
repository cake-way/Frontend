'use client';

import Image from 'next/image';
import Title from '@/app/_components/my-log/Title';

interface MyCakeLogProps {
  cakelogs: Array<{
    cakeLogid: number;
    username: string;
    cakeShopName: string;
    cakeCategoryName: string;
    title: string;
    thumbnailImage: string;
    body: string;
    isPublic: true;
    imageList: [string];
  }>;
}

const MyCakeLog: React.FC<MyCakeLogProps> = ({ cakelogs }) => {
  return (
    <section className="mt-6">
      <Title title="나의 케이크 로그" />
      {cakelogs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          작성한 케이크 로그가 없습니다.
        </p>
      ) : (
        <section className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
          {cakelogs.map((cake, index) => (
            <div key={index} className="relative w-full h-[215px]">
              {/* 이미지 */}
              <Image
                src={cake.thumbnailImage}
                alt={cake.title}
                layout="fill"
                objectFit="cover"
              />
              {/* 그라데이션 배경 */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* 이미지 위에 제목 */}
              <div className="px-4 absolute text-[12px] bottom-0 left-0 w-full text-white pb-[12px] whitespace-pre-line z-10">
                {cake.title}
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default MyCakeLog;
