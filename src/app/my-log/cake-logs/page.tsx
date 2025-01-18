'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Header from '@/app/_components/Header';
import { savedLog } from 'constants/constants';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';

import MarkIconDefault from '../../../../public/my-log-images/mark.svg';
import MarkIcon from '@/app/_components/Icons/MarkIcon';
import { useRouter } from 'next/navigation';

const CakeLogs = () => {
  const router = useRouter();

  const handleToLogDetail = (cakeLogid: number) => {
    // cakelog_id를 URL에 포함시켜서 동적 라우팅
    router.push(`/log-detail/${cakeLogid}`);
  };

  const [marked, setMarked] = useState<boolean[]>(
    Array(savedLog.length).fill(false)
  );

  const toggleMark = (index: number) => {
    setMarked((prev) =>
      prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
    );
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  return (
    <main className="w-full flex flex-col items-center text-white font-sans">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 케이크로그"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      <section className="w-full mt-7 px-[20px] grid grid-cols-2 gap-2 items-center">
        {savedLog.map((cake, index) => (
          <div key={index} className="relative w-full h-[250px]">
            {/* 이미지 */}
            <Image
              src={cake.src}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={() => handleToLogDetail(cake.cakeLogid)}
            />

            <button
              onClick={() => toggleMark(index)} // 클릭 시 상태 변경
              className="absolute top-2 right-2 z-10"
            >
              {marked[index] ? (
                // marked가 true일 때 컴포넌트 렌더링
                <MarkIcon />
              ) : (
                // marked가 false일 때 이미지 렌더링
                <Image
                  src={MarkIconDefault} // 기본 마크 이미지
                  alt="Mark"
                />
              )}
            </button>

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

export default CakeLogs;
