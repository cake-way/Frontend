'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Title from './Title';
import { useRouter } from 'next/navigation';

interface LogData {
  src: StaticImageData; // Next.js `Image` 컴포넌트에 사용 가능한 타입
  title: string;
  cakeLogid: string; // 각 로그 항목의 고유한 cakelog_id
}

interface SavedLogProps {
  savedLog: LogData[]; // cakelog_id를 포함한 savedLog 데이터
}

const SavedLog: React.FC<SavedLogProps> = ({ savedLog }) => {
  const router = useRouter();

  const handleToLogDetail = (cakeLogid: string) => {
    // cakelog_id를 URL에 포함시켜서 동적 라우팅
    router.push(`/log-detail/${cakeLogid}`);
  };

  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title title="저장한 케이크로그" link="/my-log/cake-logs" />

      {/* 저장된 디자인 미리보기 */}
      <section className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
        {savedLog.map((cake, index) => (
          <div
            key={index}
            onClick={() => handleToLogDetail(cake.cakeLogid)} // 클릭 시 cakelog_id를 넘겨줌
            className="relative w-full h-[250px] cursor-pointer"
          >
            {/* 이미지 */}
            <Image
              src={cake.src}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
              onClick={() => handleToLogDetail(cake.cakeLogid)} // 이미지 클릭 시에도 동적 라우팅
            />

            {/* 그라데이션 배경 */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* 이미지 위에 제목 */}
            <div className="px-4 absolute bottom-0 left-0 w-full text-white pb-[12px] whitespace-pre-line z-10">
              {cake.title}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default SavedLog;
