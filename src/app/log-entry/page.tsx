'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { MyCakeLogProps } from 'types/cake-log/myCakeLogs';

import BackIcon from '../../../public/header-images/back.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';

import Header from '../_components/Header';
import CreateLog from '../_components/log-entry/CreateLog';
import MyCakeLog from '../_components/log-entry/MyCakeLog';
import { fetchCakelogData } from '../_lib/api/myCakeLogs';

const LogEntry = () => {
  const [latestOrderShop, setLatestOrderShop] = useState<string | null>(null);
  const [cakelogs, setCakelogs] = useState<MyCakeLogProps['cakelogs']>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const data = await fetchCakelogData();
        setLatestOrderShop(data.latestOrderShop); // 가장 최근 주문한 가게
        setCakelogs(data.cakelogs); // 나의 케이크 로그들
      } catch (error) {
        console.error('Failed to fetch cakelog data:', error);
      }
    };

    fetchLogData();
  }, []);

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice'); // 임시...
  };

  const headerProps = {
    leftButtonImage: <Image src={BackIcon} alt="Back Icon" />,
    onLeftButtonClick: handleLeftButtonClick,
    centerText: '케이크 로그 작성',
    rightButtonImage: [
      <Image
        key="Alarm"
        width={24}
        height={24}
        src={AlarmIcon}
        alt="Alarm Icon"
      />,
    ],
    onRightButtonClick: [handleRightButtonClick],
    borderBottom: true,
  };

  return (
    <div>
      <Header {...headerProps} />
      <main className="w-full px-5">
        <CreateLog latestOrderShop={latestOrderShop} />
        <MyCakeLog cakelogs={cakelogs} />
      </main>
    </div>
  );
};

export default LogEntry;
