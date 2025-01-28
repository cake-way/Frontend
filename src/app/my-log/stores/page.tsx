'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';

import Header from '@/app/_components/Header';
import {
  fetchStoreScrapData,
  toggleScrapMark,
} from '@/app/_lib/api/storeScrap';
import { StoreScrap } from 'types/store/store-scrap';
import StoreItem from '@/app/_components/my-log/store/StoreItem';
import EmptyState from '@/app/_components/my-log/EmptyState';

const CakeStores = () => {
  const router = useRouter();
  const [storeScrap, setStoreScrap] = useState<StoreScrap[]>([]);
  const [marked, setMarked] = useState<boolean[]>([]);

  useEffect(() => {
    const loadScrapStoreData = async () => {
      try {
        const data = await fetchStoreScrapData();
        setStoreScrap(data); // 가게 스크랩 데이터 설정
        setMarked(data.map(() => true)); // 모든 항목의 초기 마크 상태 설정
      } catch (error) {
        console.error(error);
      }
    };

    loadScrapStoreData();
  }, []);

  const handleToggleScrapMark = async (index: number, shopId: number) => {
    try {
      await toggleScrapMark(shopId);

      // 마크 상태 반전
      setMarked((prev) =>
        prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
      );

      // 가게 삭제 후 marked 상태도 반영하여 다시 설정
      setStoreScrap((prev) => {
        const updatedStores = prev.filter((store) => store.shopId !== shopId);
        const updatedMarked = updatedStores.map(() => true); // 새로운 가게 목록에 대해 마크 상태 초기화
        setMarked(updatedMarked); // 새로운 마크 상태 반영
        return updatedStores;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleToShopDetail = (storeId: number) => {
    router.push(`/shop/${storeId}`);
  };

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };

  const headerProps = {
    leftButtonImage: <Image src={BackIcon} alt="back" />,
    onLeftButtonClick: () => {
      router.back();
    },
    centerText: '저장한 가게',
    rightButtonImage: [
      <Image width={24} height={24} key="Alarm" src={AlarmIcon} alt="Alarm" />,
    ],
    onRightButtonClick: [handleAlarmIconClick],
    borderBottom: true,
  };

  return (
    <main className="w-full flex flex-col items-center text-white font-sans">
      <Header {...headerProps} />

      <section className="flex w-full mt-7 px-5 flex-col gap-[23px]">
        {storeScrap.length > 0 ? (
          storeScrap.map((store, index) => (
            <StoreItem
              key={store.shopId}
              store={store}
              index={index}
              marked={marked}
              onToggleScrap={handleToggleScrapMark}
              onNavigate={handleToShopDetail}
            />
          ))
        ) : (
          <EmptyState item="가게" />
        )}
      </section>
    </main>
  );
};

export default CakeStores;
