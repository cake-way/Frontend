'use client';

import Image from 'next/image';
import back from '../../../../public/header-images/orderBack.svg';
import { cakeLog, cakes } from '../../../../constants/mockData';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';

export default function CakeDetail() {
  const router = useRouter();
  const { cake_id } = useParams();

  const onClickedOrder = () => {
    router.push(`/order/${cake_id}`);
  };

  const onclickedBack = () => {
    router.back();
  };

  return (
    <div className="w-full  mx-auto">
      <Header
        leftButtonImage={<Image src={back} alt="back" />}
        centerText="예약하기"
        onLeftButtonClick={onclickedBack}
        backgroundTransparent={true}
      ></Header>
      {/* 상단 케이크 이미지 */}
      <div className="relative w-full h-72">
        <Image
          src="/home/cake-pick-cake2.svg"
          alt="케이크 이미지"
          fill
          className="object-cover aspect-square"
        />
      </div>

      {/* 케이크 상세 정보 */}
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">고양이 케이크</h1>
          <p className="  heading-1 mr-5">40,000원</p>
        </div>
        <p className="text-sm font-medium text-grayscale800 ">
          케이크 로그 100개
        </p>
        <div className="mt-3.5 ">
          <div>
            <div className="flex gap-1">
              <Image
                src="/shop/positionIcon.svg"
                alt="position_icon"
                width={24}
                height={24}
              />
              <p className="text-base font-semibold text-grayscale900">
                씨에이크 성수점
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-grayscale700 font-medium">
                서울특별시 마포구 독막로15길 17 1층
              </p>
              <button className="text-sm font-medium text-grayscale600">
                지도보기
              </button>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-grayscale900 text-white py-2 rounded-[22px] mt-[26px]"
          onClick={onClickedOrder}
        >
          예약하기
        </button>
      </div>

      {/* 다른 디자인 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">다른 디자인</h2>
        <div className="flex gap-[5px] overflow-x-auto no-scrollbar">
          {cakes.map((design) => (
            <div key={design.cake_id}>
              <div className="relative  h-40  aspect-square">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover "
                />
              </div>
              <p className="mt-[2px] text-sm font-medium">{design.name}</p>
              <p className="text-xs font-medium ">{design.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 케이크 로그 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">케이크 로그</h2>
        <div className="flex gap-[5px] overflow-x-auto no-scrollbar">
          {cakeLog.map((log) => (
            <div key={log.id} className="relative">
              <div className=" relative w-auto h-56 aspect-[3/4] ">
                <div
                  className="z-20 absolute bottom-0  w-full h-[50%]"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(117, 117, 117, 0.00) 0%,  rgba(15, 15, 15, 0.66) 100%)',
                    backgroundBlendMode: 'multiply',
                  }}
                ></div>
                <Image
                  src={log.image}
                  alt={log.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="  text-grayscale100  left-3 z-20 absolute bottom-8 mt-[2px] text-sm font-medium">
                {log.title}
              </p>
              <p className="z-20 text-sm absolute left-3 bottom-4 text-grayscale100">
                {log.user}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
