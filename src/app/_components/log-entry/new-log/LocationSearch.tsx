'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import MapIcon from '../../../../../public/log-entry/map-icon.svg';
import SearchIcon from '../../../../../public/header-images/search.svg';
import { fetchShopName } from '@/app/_lib/api/searchShopName';
import { debounce } from 'lodash';

interface RecentOrder {
  shopId: number;
  shopName: string;
}

interface LocationSearchProps {
  onShopSelect: (shopId: number) => void; // 부모에서 전달할 함수 타입
}

const LocationSearch = ({ onShopSelect }: LocationSearchProps) => {
  const [searchResults, setSearchResults] = useState<RecentOrder[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // debounce 적용
  const debouncedSearch = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.trim()) {
        try {
          const results = await fetchShopName(keyword);
          setSearchResults(results);
        } catch (error) {
          console.error('서버 요청 중 오류 발생:', error);
          setSearchResults([]);
        } finally {
          setIsResultsVisible(true);
        }
      } else {
        setSearchResults([]);
        setIsResultsVisible(false);
      }
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    debouncedSearch(keyword); // 디바운스된 함수 호출
  };

  const handleSelectResult = (shopId: number, shopName: string) => {
    setSelectedPlace(shopName);
    onShopSelect(shopId);
    setIsResultsVisible(false);
    setSearchKeyword('');
    setSearchResults([]);
    debouncedSearch.cancel(); // pending 상태의 debounced 함수를 취소
  };

  const handleClearSelection = () => {
    setSelectedPlace(null);
    setSearchResults([]);
    setIsResultsVisible(false);
    setSearchKeyword(''); // 선택 해제 후 검색어 초기화
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
            value={searchKeyword} // 검색어 상태로 연결
            onChange={handleSearch} // 입력 시마다 handleSearch 호출
            className="w-full text-[14px] p-2 pl-8 pr-10 border border-gray-300 rounded-[4px] caret-primaryRed1 focus:outline-none"
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
            <div
              className="absolute z-10 left-5 right-5 bg-white border border-gray-300 rounded-b-[4px] shadow-lg h-auto max-h-[200px] overflow-y-auto scrollbar-hidden"
              style={{
                marginTop: '-3px',
              }}
            >
              <ul>
                {searchResults.map((result) => (
                  <li
                    key={result.shopId}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelectResult(result.shopId, result.shopName)
                    }
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {result.shopName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">검색 결과가 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSearch;
