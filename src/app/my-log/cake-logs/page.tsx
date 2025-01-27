'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '@/app/_components/Header';
import { useRouter } from 'next/navigation';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

interface ScrapLog {
  id: number;
  scrapType: string;
  imageUrl: string;
  title: string;
  isMarked: boolean; // 각 로그 항목에 마크 상태를 추가
}

const CakeLogs = () => {
  const router = useRouter();
  const [scrapLogs, setScrapLogs] = useState<ScrapLog[]>([]);

  const handleToLogDetail = (cakeLogid: number) => {
    router.push(`/log-detail/${cakeLogid}`);
  };

  const toggleMark = async (index: number, cakeLogId: number) => {
    // 해당 항목의 마크 상태를 반전시키는 방식으로 처리
    const updatedLogs = [...scrapLogs];
    updatedLogs[index].isMarked = !updatedLogs[index].isMarked;

    setScrapLogs(updatedLogs); // 상태 업데이트

    if (!updatedLogs[index].isMarked) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKELOG/${cakeLogId}`,
          {
            method: 'DELETE',
            headers: getAuthHeaders(),
          }
        );
        if (response.ok) {
          // 삭제 성공 시 해당 항목을 상태에서 제거
          setScrapLogs((prevLogs) =>
            prevLogs.filter((log) => log.id !== cakeLogId)
          );
        } else {
          console.error('스크랩을 삭제하는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('스크랩을 삭제하는 데 실패했습니다.', error);
      }
    }
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  // 스크랩 데이터를 가져오는 API 호출
  useEffect(() => {
    const fetchScrapLogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap?scrapType=CAKELOG`,
          {
            method: 'GET',
            headers: getAuthHeaders(),
          }
        );
        const data: ScrapLog[] = await response.json();

        // 가져온 데이터에 'isMarked' 상태를 추가하여 스크랩 항목을 초기화
        const updatedData = data.map((log) => ({
          ...log,
          isMarked: true, // 이미 스크랩된 항목이므로 초기 상태에서 isMarked를 true로 설정
        }));

        setScrapLogs(updatedData); // 스크랩 데이터 저장
      } catch (error) {
        console.error('스크랩 데이터를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchScrapLogs();
  }, []);

  return (
    <main className="w-full flex flex-col items-center text-white font-sans">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => router.back()}
        centerText="저장한 케이크로그"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      <section className="w-full mt-7 px-[20px] grid grid-cols-2 gap-2 items-center">
        {scrapLogs.map((cake, index) => (
          <div key={cake.id} className="relative w-full h-[250px]">
            {/* 이미지 */}
            <Image
              src={cake.imageUrl}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={() => handleToLogDetail(cake.id)} // cake.id를 사용하여 로그 상세 페이지로 이동
            />

            <button
              onClick={() => toggleMark(index, cake.id)} // 클릭 시 상태 변경 및 삭제
              className="absolute top-2 right-2 z-10"
            >
              {cake.isMarked ? (
                // marked가 true일 때 마크 아이콘 표시
                <FilledMarkIcon />
              ) : (
                // marked가 false일 때 기본 마크 이미지 표시
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
