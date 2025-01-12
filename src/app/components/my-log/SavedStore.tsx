'use client';
import Image from 'next/image';
import React from 'react';

import Status from '../../../../public/my-log-images/status.svg';
import Title from './Title';

interface StoreData {
  storeImage: string; // 가게 케이크 사진
  isSameDayReservation: boolean; // 당일 예약 여부
  storename: string; // 카페 이름
  openingHours: string; // 영업 시간
  address: string; // 카페 주소
}
interface SavedStoreProps {
  stores: StoreData[]; // 저장된 가게 목록
}

const SavedStore: React.FC<SavedStoreProps> = ({ stores }) => {
  return (
    <main className="mt-[35px] px-[32px] flex flex-col items-center">
      <Title title="저장한 가게" link="/my-log/stores" />

      {/* 저장된 가게 리스트 */}
      <div className="flex w-full mt-[15px] flex-col gap-[23px]">
        {stores.map((store, index) => (
          <section key={index} className="flex items-center gap-4">
            {/* 왼쪽: 가게 케이크 사진 */}
            <figure className="flex-shrink-0 w-[110px] h-[110px]">
              <Image
                src={store.storeImage}
                alt={`${store.storename}의 대표 이미지`}
                width={110}
                height={110}
                className="object-cover"
              />
            </figure>

            {/* 오른쪽: 가게 정보 */}
            <div className="flex flex-col">
              {/* 당일 예약 여부 */}
              <span
                className={`px-2 py-[2px] mb-1 text-sm border rounded-full text-body2 w-fit ${
                  store.isSameDayReservation
                    ? 'bg-[#FFDDE2] text-primaryRed1 border-primaryRed2'
                    : 'bg-red-200 text-red-800 border-red-500'
                }`}
              >
                {store.isSameDayReservation ? '당일예약' : ''}
              </span>

              {/* 가게 정보 */}
              <h1 className="text-lg font-bold">{store.storename}</h1>
              <section className="flex gap-1 text-sm font-semibold text-black mb-3">
                <Image src={Status} alt="상태 표시" />
                영업 중 {store.openingHours}
              </section>
              <p className="text-sm text-black"> {store.address}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default SavedStore;
