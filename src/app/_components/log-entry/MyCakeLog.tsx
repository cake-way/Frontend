'use client';

import Image from 'next/image';
import Title from '@/app/_components/my-log/Title';
import { useRouter } from 'next/navigation';
import LogIcon from '../Icons/LogIcon';

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
  const router = useRouter();

  const handleToLogDetail = (cakeLogid: number) => {
    // cakelog_id를 URL에 포함시켜서 동적 라우팅
    router.push(`/log-detail/${cakeLogid}`);
  };

  return (
    <section className="mt-6">
      <Title title="나의 케이크 로그" />
      {cakelogs.length === 0 ? (
        <div className=" flex flex-col items-center justify-center mt-36">
          <LogIcon width={56} height={56} />
          <p className="text-center font-bold text-[18px] text-gray-700">
            작성한 로그 없음
          </p>
          <p className=" w-1/2 text-center text-sm text-gray-600">
            케이크 경험을 다른 사람들과 함께 공유해요
          </p>
        </div>
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
                onClick={() => {
                  handleToLogDetail(cake.cakeLogid);
                }}
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
