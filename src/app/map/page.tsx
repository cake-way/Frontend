'use client';

import { useState } from 'react';
import InputField from '../_components/InputField';
import KakaoMap from '../_components/map/KakaoMap';
import DraggableBottomSheet from '../_components/map/BottomSheet';

export default function Map() {
  const [todayPickUp, setTodayPick] = useState(false);

  const onTodayPickUpClicked = () => {
    setTodayPick((pre) => !pre);
  };

  return (
    <>
      {/* 상단부분 */}
      <div className="w-full p-4 absolute z-50 flex gap-3  flex-col">
        <InputField placeholder="지역, 공간, 주소 검색" map={true} />
        <div className="flex mb-2 ">
          <div
            className={`
                transition-colors
                ${todayPickUp ? 'bg-grayscale900 text-grayscale100' : 'bg-[#ffffff] text-grayscale700'}
                px-[14px] py-1 border  shadow rounded-[14px]  text-sm font-medium`}
            onClick={onTodayPickUpClicked}
          >
            당일픽업
          </div>
        </div>
      </div>

      <KakaoMap />
      <DraggableBottomSheet />
    </>
  );
}
