'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/_components/Header';
import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';

import Status from '../../../../public/my-log-images/status.svg';

import useUserStore from '@/app/store/userStore';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import MarkIcon from '@/app/_components/Icons/MarkIcon';
import { useState, useEffect } from 'react';

const CakeStores = () => {
  const router = useRouter();
  const { storeScrap } = useUserStore();

  const [marked, setMarked] = useState<boolean[]>(
    Array(storeScrap.length).fill(true)
  );

  useEffect(() => {
    setMarked(Array(storeScrap.length).fill(true)); // storeScrap이 변경되면 marked 상태 초기화
  }, [storeScrap]);

  const token = localStorage.getItem('token');

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

  // 로그 상세 페이지로 이동
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
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      {/* 저장된 가게 리스트 */}
      <div className="flex w-full mt-7 px-5 flex-col gap-[23px]">
        {storeScrap.length > 0 ? (
          storeScrap.map((store, index) => (
            <section
              key={store.storeId}
              className="flex items-center gap-4 relative"
            >
              {/* 왼쪽: 가게 이미지 */}
              <figure className="flex-shrink-0 w-[110px] h-[110px]">
                <Image
                  src={store.storeImage}
                  alt={`${store.storeName}의 대표 이미지`}
                  width={110}
                  height={110}
                  className="object-cover"
                  onClick={() => {
                    handleToShopDetail(store.storeId);
                  }}
                />
              </figure>

              {/* 오른쪽: 가게 정보 */}
              <div className="flex flex-col">
                {/* 당일 예약 여부 */}
                <div className="flex justify-between mb-1">
                  <span
                    className={`px-2 py-[2px] text-sm border rounded-full text-body2 w-fit ${
                      store.sameDay
                        ? 'bg-[#FFDDE2] text-primaryRed1 border-primaryRed2'
                        : 'bg-red-200 text-red-800 border-red-500'
                    }`}
                  >
                    {store.sameDay ? '당일예약' : ''}
                  </span>
                </div>

                {/* 가게 정보 */}
                <h1 className="text-lg font-bold text-black">
                  {store.storeName}
                </h1>
                <section className="flex gap-1 text-sm font-semibold text-black mb-3">
                  <Image src={Status} alt="상태 표시" />
                  {`영업 중 ${store.operatingHours.openTime.hour
                    .toString()
                    .padStart(2, '0')}:${store.operatingHours.openTime.minute
                    .toString()
                    .padStart(2, '0')} ~ ${store.operatingHours.closeTime.hour
                    .toString()
                    .padStart(2, '0')}:${store.operatingHours.closeTime.minute
                    .toString()
                    .padStart(2, '0')}`}
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
                <button onClick={() => toggleMark(index, store.storeId)}>
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
