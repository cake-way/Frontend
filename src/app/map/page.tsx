'use client';

import { useEffect, useRef, useState } from 'react';
import KakaoMap from '../_components/map/KakaoMap';
import DraggableBottomSheet from '../_components/map/BottomSheet';
import useHomeLocationStore from '../store/homeLocationStore';
import SearchIcon from '../_components/Icons/SearchIcon';
import { MapShops } from 'types/relatedCake';

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Map() {
  const [todayPickUp, setTodayPick] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // 맵 현재 위치의 좌표값을 저장할 상태
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [shops, setShops] = useState<MapShops[] | null>(null);
  const { mapLocation } = useHomeLocationStore();
  const [keyword, setKeyword] = useState<string>('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const param = new URLSearchParams();
        const coord = coordinates ||
          mapLocation || { lat: 37.554, lng: 126.9368 };
        if (keyword !== '') param.append('keyword', keyword);
        param.append('latitude', coord.lat.toString());
        param.append('longitude', coord.lng.toString());

        param.append('isSameDay', `${todayPickUp}`);
        const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/map/shops?${param}`;
        const response = await fetch(URL);
        const data = await response.json();

        setShops(data);
      } catch (e) {
        console.log('searchMapApi error:', e);
      }
    };

    fetchShops();
  }, [coordinates, todayPickUp, keyword]);

  console.log(shops);

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
        <div
          className={`${'bg-[#ffffff] shadow'} flex items-center gap-[10px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px] w-full`}
        >
          <div className="flex items-center gap-[10px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px] w-full bg-[#ffffff] shadow">
            <SearchIcon focus={focus} />
            <input
              id="search-input"
              type="text"
              placeholder="지역, 공간, 주소 검색"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
              className="placeholder-gray-500 flex-grow text-[14px] text-[#131313] outline-none bg-transparent caret-primaryRed1"
              aria-label="검색어 입력"
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
            />
          </div>
        </div>

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
      <KakaoMap mapRef={mapRef} coordinates={coordinates} shops={shops} />

      <DraggableBottomSheet getCoordinates={getCoordinates} shops={shops} />
    </>
  );
}
