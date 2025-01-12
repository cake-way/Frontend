'use client';

import Image from 'next/image';

import Header from '@/app/components/Header';
import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';

import Store1 from '../../../../public/my-log-images/store-1.svg';
import Status from '../../../../public/my-log-images/status.svg';
import MarkIcon from '@/app/components/Icons/MarkIcon';
import { useRouter } from 'next/navigation';

const storeData = [
  {
    storeImage: Store1,
    isSameDayReservation: true,
    storename: '카페 한잔',
    openingHours: '08:00 ~ 22:00',
    address: '서울특별시 강남구 카페로 123',
  },
  {
    storeImage: Store1,
    isSameDayReservation: true,
    storename: '카페 두잔',
    openingHours: '09:00 ~ 21:00',
    address: '서울특별시 서초구 카페로 456',
  },
];

const CakeStores = () => {
  const router = useRouter();
  return (
    <main className="w-full h-screen flex flex-col items-center text-white font-sans">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 가게"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        borderBottom={true}
      />

      {/* 저장된 가게 리스트 */}
      <div className="flex w-full mt-[105px] px-8 flex-col gap-[23px]">
        {storeData.map((store, index) => (
          <section key={index} className="flex items-center gap-4 relative">
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
              <div className="flex justify-between mb-1">
                <span
                  className={`px-2 py-[2px] text-sm border rounded-full text-body2 w-fit ${
                    store.isSameDayReservation
                      ? 'bg-[#FFDDE2] text-primaryRed1 border-primaryRed2'
                      : 'bg-red-200 text-red-800 border-red-500'
                  }`}
                >
                  {store.isSameDayReservation ? '당일예약' : ''}
                </span>
              </div>

              {/* 가게 정보 */}
              <h1 className="text-lg font-bold text-black">
                {store.storename}
              </h1>
              <section className="flex gap-1 text-sm font-semibold text-black mb-3">
                <Image src={Status} alt="상태 표시" />
                영업 중 {store.openingHours}
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
              <MarkIcon fill="#292929" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default CakeStores;
