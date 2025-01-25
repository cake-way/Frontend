'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/app/_components/Header';
import { useRouter } from 'next/navigation';
import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import useUserStore from '@/app/store/userStore';
import MarkIcon from '@/app/_components/Icons/MarkIcon';

const CakeLogs = () => {
  const router = useRouter();
  const { logScrap } = useUserStore(); // 전역적으로 관리되는 logScrap 정보 가져오기

  const [marked, setMarked] = useState<boolean[]>(
    Array(logScrap.length).fill(false)
  ); // 마크의 fill 유무를 상태로 관리

  useEffect(() => {
    setMarked(Array(logScrap.length).fill(false)); // logScrap이 변경되면 marked 상태도 초기화
  }, [logScrap]);

  const token = localStorage.getItem('token');

  const toggleMark = async (index: number, cakelogId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKELOG/${cakelogId}`,
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

        // zustand 상태 업데이트
        useUserStore.setState((state) => ({
          logScrap: state.logScrap.filter((log) => log.logId !== cakelogId), // 삭제된 로그만 필터링
        }));
      } else {
        console.error('Failed to delete scrap.');
      }
    } catch (error) {
      console.error('Error deleting scrap:', error);
    }
  };

  // 로그 상세 페이지로 이동
  const handleToLogDetail = (cakeLogid: number) => {
    router.push(`/log-detail/${cakeLogid}`);
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

      {logScrap.length === 0 ? (
        // 저장된 케이크 로그가 없을 때
        <div className=" flex flex-col gap-2 items-center justify-center mt-60">
          <MarkIcon className="p-2" width={54} height={54} />
          <p className="text-center font-bold text-[18px] text-gray-700">
            저장한 케이크로그 없음
          </p>
          <p className="text-center text-sm text-gray-400">
            CakeWay에서 케이크와 로그를
            <br />
            저장하고 컬렉션을 구성해보세요!
          </p>
        </div>
      ) : (
        <section className="w-full mt-7 px-[20px] grid grid-cols-2 gap-2 items-center">
          {logScrap.map((cake, index) => (
            <div key={index} className="relative w-full h-[250px]">
              {/* 이미지 */}
              <Image
                src={cake.logImage}
                alt={cake.title}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => handleToLogDetail(cake.logId)}
              />

              <button
                onClick={() => toggleMark(index, cake.logId)} // 클릭 시 상태 변경
                className="absolute top-2 right-2 z-10"
              >
                {marked[index] ? (
                  <FilledMarkIcon />
                ) : (
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
      )}
    </main>
  );
};

export default CakeLogs;
