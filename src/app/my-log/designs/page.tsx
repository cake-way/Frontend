'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/_components/Header';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';

import useUserStore from '@/app/store/userStore';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import MarkIcon from '@/app/_components/Icons/MarkIcon';

const CakeDesigns = () => {
  const router = useRouter();

  const { designScrap } = useUserStore();

  const [marked, setMarked] = useState<boolean[]>(
    Array(designScrap.length).fill(true)
  ); // 상태로 관리: 저장된 디자인과 마크 상태

  useEffect(() => {
    setMarked(Array(designScrap.length).fill(true)); // designScrap이 변경되면 marked 상태도 초기화
  }, [designScrap]);

  const token = localStorage.getItem('token');

  const toggleMark = async (index: number, cakeId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKE/${cakeId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // API 호출 성공 시 상태 업데이트
        setMarked((prev) =>
          prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
        );

        // 삭제된 디자인만 필터링
        useUserStore.setState((state) => ({
          designScrap: state.designScrap.filter(
            (design) => design.cakeId !== cakeId
          ),
        }));
      } else {
        console.error('Failed to delete scrap.');
      }
    } catch (error) {
      console.error('Error deleting scrap:', error);
    }
  };

  //디자인 상세 페이지로 이동
  const handleToDesignDetail = (cakeId: number) => {
    router.push(`/cakeDetail/${cakeId}`);
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
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
      {designScrap.length === 0 ? (
        // 저장된 가게가 없을 때 메시지
        <div className=" flex flex-col gap-2 items-center justify-center mt-60">
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
          {designScrap.map((design, index) => (
            <div
              key={design.cakeId}
              className="relative w-full h-[300px] overflow-hidden bg-gray-200"
            >
              {/* 이미지 */}
              <Image
                src={design.cakeImage}
                alt={`design-${design.cakeId}`}
                fill
                style={{ objectFit: 'cover' }}
                className="cursor-pointer"
                onClick={() => {
                  handleToDesignDetail(design.cakeId);
                }}
              />

              {/* 마크 토글 버튼 */}
              <button
                onClick={() => toggleMark(index, design.cakeId)}
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
