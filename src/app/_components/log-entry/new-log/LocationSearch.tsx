'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MapIcon from '../../../../../public/log-entry/map-icon.svg';
import SearchIcon from '../../../../../public/header-images/search.svg';
import { KakaoMapStatus, Place } from 'types/kakaoMap.types';

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    const existingScript = document.getElementById('kakao-map-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&_=${new Date().getTime()}&autoload=false`;
      script.async = true;

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            if (window.kakao.maps.services) {
              setIsKakaoReady(true);
            } else {
              console.error('Kakao Maps API 준비 실패: services가 없습니다.');
            }
          });
        } else {
          console.error(
            'Kakao Maps API 로드 실패: window.kakao 또는 kakao.maps가 없습니다.'
          );
        }
      };

      script.onerror = () => {
        console.error('Kakao Maps SDK 로드에 실패했습니다.');
      };

      document.head.appendChild(script);
    }
  }, []);

  const handleSearch = () => {
    if (!isKakaoReady || !searchTerm.trim()) {
      console.error(
        'Kakao Maps API가 준비되지 않았거나 검색어가 비어 있습니다.'
      );
      return;
    }

    const { kakao } = window;
    const places = new kakao.maps.services.Places();
    places.keywordSearch(
      searchTerm,
      (data: Place[], status: KakaoMapStatus) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResults(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setSearchResults([]);
        } else {
          console.error('검색 도중 오류가 발생했습니다.');
        }
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectResult = (placeName: string) => {
    setSelectedPlace(placeName);
    setSearchResults([]);
  };

  const handleClearSelection = () => {
    setSelectedPlace(null);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full px-5">
      <p className="font-semibold mb-[6px]">장소 입력</p>
      <p className="mb-3 text-[12px]">
        <span className="text-primaryRed1">최근 방문한 가게</span>를 쉽게 선택해
        보세요!
      </p>
      {selectedPlace ? (
        <div className="flex items-center border border-gray-300 p-2 rounded-[4px]">
          <Image src={MapIcon} alt="Map Icon" className="w-5 h-5 mr-2" />
          <span className="flex-grow text-[14px]">{selectedPlace}</span>
          <button
            onClick={handleClearSelection}
            className="text-gray-500 hover:text-gray-700 pr-1"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="가게 검색하기"
            className="w-full text-[14px] p-2 pl-8 pr-10 border border-gray-300 rounded-[4px] caret-primaryRed1 focus:outline-none"
          />
          <Image
            src={SearchIcon}
            alt="Search Icon"
            onClick={handleSearch}
            className="absolute left-2 w-5 h-5 cursor-pointer"
          />
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-11/12 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto scrollbar-hidden">
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectResult(result.place_name)}
              >
                <div className="text-sm font-medium text-gray-900">
                  {result.place_name}
                </div>
                <div className="text-sm text-gray-600">
                  {result.address_name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
