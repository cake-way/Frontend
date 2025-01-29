'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';

import BackIcon from '../../../../public/header-images/back.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';

import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

interface Curation {
  curationId: number;
  title: string;
  thumbnailImage: string;
}

export default function AllCakewayPicks() {
  const router = useRouter();

  const [curations, setCurations] = useState<Curation[]>([]);
  const [marked, setMarked] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/curation`,
          {
            method: 'GET',
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch curations');
        }

        const data: Curation[] = await response.json();
        setCurations(data);
        setMarked(Array(data.length).fill(false));
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
        setIsLoading(false);
      }
    };

    fetchCurations();
  }, []);

  const toggleMark = (index: number) => {
    setMarked((prev) =>
      prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
    );
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-full flex flex-col items-center text-white font-sans">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="CAKEWAY'S PICK"
        rightButtonImage={[
          <Image
            key="Alarm"
            width={24}
            height={24}
            src={AlarmIcon}
            alt="Alarm"
          />,
        ]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      <section className="w-full mt-7 px-[20px] grid grid-cols-2 gap-2 items-center">
        {curations.map((cake, index) => (
          <div key={cake.curationId} className="relative w-full h-[215px]">
            {/* 이미지 */}
            <Image
              src={cake.thumbnailImage}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
              onClick={() => {
                router.push(`/curationDetail/${cake.curationId}`);
              }}
              className="cursor-pointer"
            />

            <button
              onClick={() => toggleMark(index)} // 클릭 시 상태 변경
              className="absolute top-2 right-2 z-10"
            >
              {marked[index] ? (
                // marked가 true일 때 컴포넌트 렌더링
                <FilledMarkIcon />
              ) : (
                // marked가 false일 때 이미지 렌더링
                <Image
                  width={24}
                  height={24}
                  src={MarkIconDefault} // 기본 마크 이미지
                  alt="Mark"
                />
              )}
            </button>

            {/* 그라데이션 배경 */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* 이미지 위에 제목 */}
            <div className="px-4 text-sm absolute bottom-0 left-0 w-10/12 text-white pb-[12px] whitespace-pre-line z-10">
              {cake.title}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
