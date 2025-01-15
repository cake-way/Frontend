'use client';

import React from 'react';
import Image from 'next/image';
import Title from './Title';

interface SavedCakeData {
  src: string; // 이미지 URL
  alt: string; // 이미지 설명
}

interface SavedCakeProps {
  cakes: SavedCakeData[]; // 데이터 배열
}

const SavedCake: React.FC<SavedCakeProps> = ({ cakes }) => {
  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title title="저장한 디자인" link="/my-log/designs" />

      {/* 저장된 디자인 미리보기 */}
      <section className="mt-4 w-full h-[360px] grid grid-cols-2 grid-rows-2 rounded-lg overflow-hidden">
        {cakes.map((cake, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              src={cake.src}
              alt={cake.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default SavedCake;
