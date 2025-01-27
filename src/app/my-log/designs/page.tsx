'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';
import Header from '@/app/_components/Header';

import { getCakeDesigns, toggleMark } from '@/app/_lib/api/cakeDesigns';
import EmptyState from '@/app/_components/my-log/store/EmptyState';
import {
  CakeDesign,
  CakeDesignGrid,
} from '@/app/_components/my-log/design/CakeDesignCard';

const CakeDesigns = () => {
  const router = useRouter();
  const [cakeDesigns, setCakeDesigns] = useState<CakeDesign[]>([]);
  const [marked, setMarked] = useState<boolean[]>([]);

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

  const handleToggleMark = async (index: number, cakeId: number) => {
    try {
      const isSuccess = await toggleMark(cakeId);
      if (isSuccess) {
        // 마크 상태 업데이트
        setMarked((prev) =>
          prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
        );

        // 삭제된 디자인만 필터링
        setCakeDesigns((prev) => {
          const updatedDesigns = prev.filter((design) => design.id !== cakeId);

          // 새로운 마크 상태를 생성
          const newMarked = updatedDesigns.map(
            (design) => prev.some((pDesign) => pDesign.id === design.id) // 기존 디자인이 포함되어 있으면 true
          );

          setMarked(newMarked); // 마크 상태 업데이트
          return updatedDesigns;
        });
      }
    } catch (error) {
      console.error('Error toggling mark:', error);
    }
  };

  const handleToDesignDetail = (cakeId: number) => {
    router.push(`/cakeDetail/${cakeId}`);
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  const headerProps = {
    leftButtonImage: <Image src={BackIcon} alt="back" />,
    onLeftButtonClick: () => {
      router.back();
    },
    centerText: '저장한 디자인',
    rightButtonImage: [
      <Image width={24} height={24} key="Alarm" src={AlarmIcon} alt="Alarm" />,
    ],
    onRightButtonClick: [handleAlarmIconClick],
    borderBottom: true,
  };

  return (
    <main className="flex flex-col items-center">
      <Header {...headerProps} />

      {cakeDesigns.length === 0 ? (
        <EmptyState />
      ) : (
        <CakeDesignGrid
          designs={cakeDesigns}
          marked={marked}
          onToggleMark={handleToggleMark}
          onClickDetail={handleToDesignDetail}
        />
      )}
    </main>
  );
};

export default CakeDesigns;
