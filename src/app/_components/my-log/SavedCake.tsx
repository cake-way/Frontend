'use client';

import React from 'react';
import Image from 'next/image';

import Title from './Title';
import useUserStore from '@/app/store/userStore';

const SavedCake: React.FC = () => {
  const designScrap = useUserStore((state) => state.designScrap);

  // 배열의 마지막 4개 항목 가져오기
  const latestFourCakes = designScrap.slice(0, 4);
  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title
        title="저장한 디자인"
        link="/my-log/designs"
        length={designScrap.length}
      />

      {designScrap.length === 0 ? (
        <p className="text-gray-700 text-sm my-24">
          아직 저장한 디자인이 없어요
        </p>
      ) : (
        <section className="mt-4 w-full h-[320px] grid grid-cols-2 grid-rows-2 rounded-lg overflow-hidden">
          {latestFourCakes.map((cake, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={cake.cakeImage} // designScrap 내 각 항목의 이미지 경로
                alt={`저장된 케이크 ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default SavedCake;
