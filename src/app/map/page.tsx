'use client';

import { useRef, useState } from 'react';
import InputField from '../_components/InputField';
import KakaoMap from '../_components/map/KakaoMap';
import DraggableBottomSheet from '../_components/map/BottomSheet';

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Map() {
  const [todayPickUp, setTodayPick] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // 맵 현재 위치의 좌표값을 저장할 상태
  const mapRef = useRef<kakao.maps.Map | null>(null);

  //수정하기
  const getCoordinates = () => {
    const map = mapRef.current;

    if (map) {
      kakao.maps.event.addListener(mapRef.current!, 'center_changed', () => {
        const center = mapRef.current!.getCenter();
        setCoordinates({
          lat: center.getLat(),
          lng: center.getLng(),
        });
      });
    }
  };

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
      <KakaoMap mapRef={mapRef} coordinates={coordinates} />

      <DraggableBottomSheet getCoordinates={getCoordinates} />
    </>
  );
}
