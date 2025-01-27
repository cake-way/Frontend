'use client';
import Image from 'next/image';
import React from 'react';

import Status from '../../../../public/my-log-images/status.svg';
import Title from './Title';
import useUserStore from '@/app/store/userStore';

const SavedStore: React.FC = () => {
  const stores = useUserStore((state) => state.storeScrap);

  const lastTwoStore = stores.slice(0, 2);
  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title title="저장한 가게" link="/my-log/stores" length={stores.length} />

      {/* 조건부 렌더링: 배열이 비었을 때 메시지 표시, 아니면 가게 리스트 렌더링 */}
      {stores.length === 0 ? (
        <p className="text-gray-700 text-sm my-24">아직 저장한 가게가 없어요</p>
      ) : (
        <div className="flex w-full mt-[15px] flex-col gap-[23px]">
          {lastTwoStore.map((store, index) => (
            <section key={index} className="flex items-center gap-4">
              {/* 왼쪽: 가게 케이크 사진 */}
              <figure className="flex-shrink-0 w-[110px] h-[110px]">
                <Image
                  src={store.storeImage}
                  alt={`${store.storeName}의 대표 이미지`}
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
                <h1 className="text-lg pl-0.5 font-bold">{store.storeName}</h1>
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
                <p className="text-sm text-black"> {store.address}</p>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

export default SavedStore;
