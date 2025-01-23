'use client';

import { useState } from 'react';
import Image from 'next/image';
import MapIcon from '../../../../../public/log-entry/map-icon.svg';
import SearchIcon from '../../../../../public/header-images/search.svg';
import { fetchRecentOrders } from '@/app/_lib/api/preCakelog';

interface RecentOrder {
  shopId: number;
  shopName: string;
}

const LocationSearch = () => {
  const [searchResults, setSearchResults] = useState<RecentOrder[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const handleSearchClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('인증 토큰이 없습니다.');
      return;
    }

    try {
      const recentShops = await fetchRecentOrders(token);
      setSearchResults(recentShops);
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
      setSearchResults([]); // 오류 발생 시 빈 배열 설정
    } finally {
      setIsResultsVisible(true);
    }
  };

  const handleSelectResult = (shopName: string) => {
    setSelectedPlace(shopName);
    setIsResultsVisible(false);
  };

  const handleClearSelection = () => {
    setSelectedPlace(null);
    setSearchResults([]);
    setIsResultsVisible(false);
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
            placeholder="가게 검색하기"
            className="w-full text-[14px] p-2 pl-8 pr-10 border border-gray-300 rounded-[4px] caret-primaryRed1 focus:outline-none"
            onClick={handleSearchClick} // 클릭 시 API 호출
            readOnly // 검색어 입력 비활성화
          />
          <Image
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-2 w-5 h-5 cursor-pointer"
          />
        </div>
      )}
      {isResultsVisible && (
        <>
          {searchResults.length > 0 ? (
            <div className="absolute z-10 w-11/12 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto scrollbar-hidden">
              <ul>
                {searchResults.map((result) => (
                  <li
                    key={result.shopId}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectResult(result.shopName)}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {result.shopName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              아직 주문 내역이 없습니다.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSearch;
