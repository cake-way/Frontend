'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '@/app/_components/Header';
import { useRouter } from 'next/navigation';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';
import MarkIconDefault from '../../../../public/my-log-images/mark.svg';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import { fetchScrapLogs, toggleMarkScrap } from '@/app/_lib/api/logScrap';

interface ScrapLog {
  id: number;
  scrapType: string;
  imageUrl: string;
  title: string;
  isMarked: boolean;
}

const CakeLogs = () => {
  const router = useRouter();
  const [scrapLogs, setScrapLogs] = useState<ScrapLog[]>([]);

  const handleToLogDetail = (cakeLogid: number) => {
    router.push(`/log-detail/${cakeLogid}`);
  };

  const toggleMark = async (index: number, cakeLogId: number) => {
    const updatedLogs = [...scrapLogs];
    const log = updatedLogs[index];

    // 상태 변경
    log.isMarked = !log.isMarked;
    setScrapLogs(updatedLogs);

    // 마크 상태가 변경되었으면 API 호출
    try {
      const success = await toggleMarkScrap(cakeLogId, log.isMarked);
      if (!success) {
        console.error('스크랩 마크 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('스크랩 마크 변경에 실패했습니다.', error);
    }
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  // 스크랩 데이터를 가져오는 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchScrapLogs();
        const updatedData = data.map((log: ScrapLog) => ({
          ...log,
          isMarked: true, // 이미 스크랩된 항목이므로 초기 상태에서 isMarked를 true로 설정
        }));
        setScrapLogs(updatedData);
      } catch (error) {
        console.error('스크랩 데이터를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchData();
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
            <Image
              src={cake.imageUrl}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={() => handleToLogDetail(cake.id)}
            />
            <button
              onClick={() => toggleMark(index, cake.id)}
              className="absolute top-2 right-2 z-10"
            >
              {cake.isMarked ? (
                <FilledMarkIcon />
              ) : (
                <Image src={MarkIconDefault} alt="Mark" />
              )}
            </button>

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

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
