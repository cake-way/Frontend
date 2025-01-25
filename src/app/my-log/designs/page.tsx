'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/_components/Header';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';

interface CakeDesign {
  id: number;
  scrapType: string;
  imageUrl: string;
  title: string;
}

import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import MarkIcon from '@/app/_components/Icons/MarkIcon';
import { getCakeDesigns, toggleMark } from '@/app/_lib/api/cakeDesigns';

const CakeDesigns = () => {
  const router = useRouter();
  const [cakeDesigns, setCakeDesigns] = useState<CakeDesign[]>([]);
  const [marked, setMarked] = useState<boolean[]>([]); // 상태로 관리: 저장된 디자인과 마크 상태

  useEffect(() => {
    const fetchCakeDesignsData = async () => {
      try {
        const data = await getCakeDesigns();
        setCakeDesigns(data);
        setMarked(new Array(data.length).fill(true)); // 초기 마크 상태 설정
      } catch (error) {
        console.error('Error fetching cake designs:', error);
      }
    };

    fetchCakeDesignsData();
  }, []);

  const handleToDesignDetail = (cakeId: number) => {
    router.push(`/cakeDetail/${cakeId}`);
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  const handleToggleMark = async (index: number, cakeId: number) => {
    try {
      const isSuccess = await toggleMark(cakeId);
      if (isSuccess) {
        // 마크 상태 업데이트
        setMarked((prev) =>
          prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
        );

        // 삭제된 디자인만 필터링
        setCakeDesigns((prev) => prev.filter((design) => design.id !== cakeId));
      }
    } catch (error) {
      console.error('Error toggling mark:', error);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 디자인"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      {/* 디자인이 없는 경우 */}
      {cakeDesigns.length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center mt-60">
          <MarkIcon className="p-2" width={54} height={54} />
          <p className="text-center font-bold text-[18px] text-gray-700">
            저장한 디자인 없음
          </p>
          <p className="text-center text-sm text-gray-400">
            CakeWay에서 케이크와 로그를
            <br />
            저장하고 컬렉션을 구성해보세요!
          </p>
        </div>
      ) : (
        // 그리드 레이아웃을 이용한 이미지 배치
        <div className="grid grid-cols-2 gap-2 w-full p-4">
          {cakeDesigns.map((design, index) => (
            <div
              key={design.id}
              className="relative w-full h-[226px] overflow-hidden bg-gray-200"
            >
              {/* 이미지 */}
              <Image
                src={design.imageUrl}
                alt={`design-${design.id}`}
                fill
                style={{ objectFit: 'cover' }}
                className="cursor-pointer"
                onClick={() => {
                  handleToDesignDetail(design.id);
                }}
              />

              {/* 마크 토글 버튼 */}
              <button
                onClick={() => handleToggleMark(index, design.id)}
                className="absolute top-2 right-2 z-10"
              >
                {marked[index] ? (
                  <FilledMarkIcon /> // 채워진 마크
                ) : (
                  <Image src={MarkIconDefault} alt="Mark" /> // 비어 있는 마크
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CakeDesigns;
