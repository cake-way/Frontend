'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Title from './Title';

interface LogData {
  src: StaticImageData; // Next.js `Image` 컴포넌트에 사용 가능한 타입
  title: string;
}

interface SavedLogProps {
  savedLog: LogData[];
}

const SavedLog: React.FC<SavedLogProps> = ({ savedLog }) => {
  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title title="저장한 케이크로그" link="/my-log/cake-logs" />

      {/* 저장된 디자인 미리보기 */}
      <section className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
        {savedLog.map((cake, index) => (
          <div key={index} className="relative w-full h-[250px]">
            {/* 이미지 */}
            <Image
              src={cake.src}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
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
