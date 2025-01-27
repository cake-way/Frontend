'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/_components/Header';
import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm-fill.svg';

import Status from '../../../../public/my-log-images/status.svg';

import useUserStore from '@/app/store/userStore';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import MarkIcon from '@/app/_components/Icons/MarkIcon';
import { useState, useEffect } from 'react';
import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

interface StoreScrap {
  shopId: number;
  shopImage: string;
  shopName: string;
  address: string;
  operatingHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    active: boolean;
  };
  scrap: boolean;
  sameDay: boolean;
}

const CakeStores = () => {
  const router = useRouter();
  const [storeScrap, setStoreScrap] = useState<StoreScrap[]>([]); // 가게 스크랩 상태
  const [marked, setMarked] = useState<boolean[]>([]); // 마크 상태
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchScrapData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap?scrapType=CAKESHOP`,
          {
            headers: getAuthHeaders(),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStoreScrap(data); // 가게 스크랩 데이터 설정
          setMarked(data.map(() => true)); // 모든 항목의 초기 마크 상태 설정
        } else {
          console.error('Failed to fetch scrap data.');
        }
      } catch (error) {
        console.error('Error fetching scrap data:', error);
      }
    };

    fetchScrapData();
  }, [token]);

  const toggleMark = async (index: number, shopId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKESHOP/${shopId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // API 호출 성공 시 마크 상태 업데이트
        setMarked((prev) =>
          prev.map((isMarked, i) => (i === index ? !isMarked : isMarked))
        );

        // 삭제된 가게 스크랩만 필터링
        useUserStore.setState((state) => ({
          storeScrap: state.storeScrap.filter(
            (store) => store.storeId !== shopId
          ),
        }));
      } else {
        console.error('Failed to delete scrap.');
      }
    } catch (error) {
      console.error('Error deleting scrap:', error);
    }
  };

  // 가게 상세 페이지로 이동
  const handleToShopDetail = (storeId: number) => {
    router.push(`/shop/${storeId}`);
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
        centerText="저장한 가게"
        rightButtonImage={[
          <Image
            width={24}
            height={24}
            key="Alarm"
            src={AlarmIcon}
            alt="Alarm"
          />,
        ]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      {/* 저장된 가게 리스트 */}
      <div className="flex w-full mt-7 px-5 flex-col gap-[23px]">
        {storeScrap.length > 0 ? (
          storeScrap.map((store, index) => (
            <section
              key={store.shopId}
              className="flex items-center gap-4 relative"
              onClick={() => {
                handleToShopDetail(store.shopId);
              }}
            >
              {/* 왼쪽: 가게 이미지 */}
              <figure className="flex-shrink-0 w-[110px] h-[110px]">
                <Image
                  src={store.shopImage}
                  alt={`${store.shopImage}의 대표 이미지`}
                  width={110}
                  height={110}
                  className="object-cover"
                />
              </figure>

              {/* 오른쪽: 가게 정보 */}
              <div className="flex flex-col">
                {/* 당일 예약 여부 */}
                {store.sameDay && (
                  <span
                    className={`px-[10px] py-[2px] mb-1 text-[12px] border rounded-full text-body2 w-fit ${
                      store.sameDay
                        ? 'bg-[#FFDDE2] text-primaryRed1 border-primaryRed2'
                        : 'bg-red-200 text-red-800 border-red-500'
                    }`}
                  >
                    당일예약
                  </span>
                )}

                {/* 가게 정보 */}
                <h1 className="text-lg pl-0.5 font-bold text-black">
                  {store.shopName}
                </h1>
                <section className="flex gap-1 text-sm font-semibold text-black mb-3">
                  <Image src={Status} alt="상태 표시" />
                  {store.operatingHours ? (
                    <>
                      영업 중{' '}
                      {`${store.operatingHours.openTime.split(':').slice(0, 2).join(':')} ~ ${store.operatingHours.closeTime.split(':').slice(0, 2).join(':')}`}
                    </>
                  ) : (
                    <span>오늘 휴무</span>
                  )}
                </section>
                <p className="text-sm text-black">{store.address}</p>
              </div>

              {/* 마크 아이콘을 섹션의 오른쪽 끝에 배치 */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                }}
              >
                <button onClick={() => toggleMark(index, store.shopId)}>
                  {marked[index] ? (
                    <FilledMarkIcon fill="#292929" />
                  ) : (
                    <MarkIcon />
                  )}
                </button>
              </div>
            </section>
          ))
        ) : (
          // 저장된 가게가 없을 때
          <div className=" flex flex-col gap-2 items-center justify-center mt-60">
            <MarkIcon className="p-2" width={54} height={54} />
            <p className="text-center font-bold text-[18px] text-gray-700">
              저장한 가게 없음
            </p>
            <p className="text-center text-sm text-gray-400">
              CakeWay에서 케이크와 로그를
              <br />
              저장하고 컬렉션을 구성해보세요!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CakeStores;
