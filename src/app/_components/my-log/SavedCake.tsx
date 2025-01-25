'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Title from './Title';
import { getCakeDesigns } from '@/app/_lib/api/cakeDesigns';

interface CakeDesign {
  id: number;
  scrapType: string;
  imageUrl: string;
  title: string;
}

const SavedCake: React.FC = () => {
  const [cakes, setCakes] = useState<CakeDesign[]>([]); // cakes 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 -> 추후 스켈레톤으로 변경

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakeDesigns();
        setCakes(data);
      } catch (error) {
        console.error('Error fetching cakes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCakes();
  }, []);

  // 배열의 마지막 4개 항목 가져오기
  const latestFourCakes = cakes.slice(0, 4); // 최신 4개 항목을 가져옵니다.

  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title
        title="저장한 디자인"
        link="/my-log/designs"
        length={cakes.length}
      />

      {/* 로딩 상태 처리 */}
      {isLoading ? (
        <p>Loading...</p>
      ) : cakes.length === 0 ? (
        <p className="text-gray-700 text-sm my-24">
          아직 저장한 디자인이 없어요
        </p>
      ) : (
        <section className="mt-4 w-full h-[320px] grid grid-cols-2 grid-rows-2 rounded-lg overflow-hidden">
          {latestFourCakes.map((cake, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={cake.imageUrl} // designScrap 내 각 항목의 이미지 경로
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
