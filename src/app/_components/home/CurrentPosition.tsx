'use client';

import { useEffect, useState } from 'react';
import SearchIcon from '../Icons/SearchIcon';
import Image from 'next/image';
import useHomeLocationStore from '@/app/store/homeLocationStore';

interface CurrentPositionProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  afterLoadedKakao: (value: boolean) => void;
}

export default function CurrentPosition({
  isOpen,
  setIsOpen,
  afterLoadedKakao,
}: CurrentPositionProps) {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const closeBottomSheet = () => setIsOpen(false);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>(
    []
  );
  const { setHomeLocation, setMapLocation } = useHomeLocationStore();

  useEffect(() => {
    if (window.kakao?.maps) {
      // autoload=false 때문에 필요한 초기화 과정
      window.kakao.maps.load(() => {
        setKakaoLoaded(true);
      });
    }

    const script = document.querySelector('script[src*="dapi.kakao.com"]');
    if (script) {
      script.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          setKakaoLoaded(true);
        });
      });
    }
  }, []);

  const searchPlace = (keyword: string) => {
    if (!kakaoLoaded) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
      }
    });
  };

  const clickedPlace = (place: kakao.maps.services.PlacesSearchResultItem) => {
    setHomeLocation(place.place_name);
    setMapLocation({ lat: Number(place.y), lng: Number(place.x) });
    setIsOpen(false);
  };

  const clicedCurrentPosition = () => {
    afterLoadedKakao(true);
    setIsOpen(false);
  };

  return (
    <div className=" w-full  max-w-[480px] ">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeBottomSheet}
      ></div>

      {/* Bottom Sheet */}
      <div
        className={`fixed mx-auto h-[80vh] bottom-0 left-0 right-0  w-full max-w-[480px] bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 z-50  ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className=" px-6 py-5 border-b">
          <p className={` text-lg cursor-pointer font-bold`}>위치 설정</p>
        </div>
        {/* search */}
        <div
          className="flex justify-center items-center w-full gap-1 p-5"
          role="search"
        >
          {/* 아이콘 */}
          <div className="flex-shrink flex items-center">
            <SearchIcon focus={focus} />
          </div>

          {/* 입력 필드 */}
          <input
            onBlur={handleBlur}
            onFocus={handleFocus}
            id="search-input"
            type="text"
            placeholder="도로명, 건물명 또는 지번으로 검색"
            className={`placeholder-grayscale500   flex-grow flex-shrink text-sm text-[#131313] outline-none bg-transparent`}
            aria-label="검색어 입력"
            onChange={(e) => searchPlace(e.target.value)}
          />
        </div>
        <div className="mb-7  h-2 bg-[#f4f4f4]"></div>
        {/* 현재위치로 주소찾기 */}
        <div className="w-full px-5" onClick={clicedCurrentPosition}>
          <div className=" w-full flex justify-center border border-solid border-grayscale500 rounded-[4px] py-2.5  gap-2">
            <Image
              src="/home/location.svg"
              alt="location_icon"
              width={20}
              height={20}
            />
            <p className="text-base text-grayscale800 whitespace-nowrap">
              현재 위치로 주소찾기
            </p>
          </div>
        </div>

        {/* 주소목록 */}
        <div className="overflow-y-auto h-[calc(80vh-211px)] pb-[var(--bottom-nav-height)]">
          {places.map((place) => (
            <div
              key={place.id}
              className="py-5 mx-5 border-b flex gap-3 cursor-pointer"
              onClick={() => clickedPlace(place)}
            >
              <Image
                src={'/shop/positionIcon.svg'}
                alt="position_icon"
                width={14}
                height={14}
              />
              <div className="text-sm font-medium text-black flex flex-col">
                <span>{place.place_name}</span>
                <span className="text-xs font-normal text-grayscale800">
                  {place.address_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
