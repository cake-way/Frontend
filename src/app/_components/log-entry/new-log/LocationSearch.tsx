'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import MapIcon from '../../../../../public/log-entry/map-icon.svg';
import SearchIcon from '../../../../../public/header-images/search.svg';

import { fetchShopName } from '@/app/_lib/api/searchShopName';
import { fetchRecentOrders } from '@/app/_lib/api/recentOrders';
import { debounce } from 'lodash';
import { LocationSearchProps, RecentOrder } from 'types/cake-log/createLog';

const LocationSearch = ({ onShopSelect }: LocationSearchProps) => {
  const [searchResults, setSearchResults] = useState<RecentOrder[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 최근 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchRecentOrders();
        const uniqueOrders = response.recentOrderList.filter(
          (order: RecentOrder, index: number, self: RecentOrder[]) =>
            self.findIndex((o) => o.shopId === order.shopId) === index
        ); // 중복 제거
        setRecentOrders(uniqueOrders);
      } catch (error) {
        console.error('최근 주문 내역을 가져오는 중 오류 발생:', error);
      }
    };

    fetchOrders();
  }, []);

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
        setSearchResults([]); // 검색어가 비어 있으면 결과를 초기화
        setIsResultsVisible(false); // 검색 결과 표시 안 함
      }
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    debouncedSearch(keyword); // 디바운스된 함수 호출
  };

  const handleSelectResult = (shopId: number | null, shopName: string) => {
    if (shopId != null) {
      // shopId가 null이 아니면 호출
      setSelectedPlace(shopName);
      onShopSelect(shopId); // 유효한 shopId일 때만 호출
      setIsResultsVisible(false);
      setSearchKeyword('');
      setSearchResults([]);
      debouncedSearch.cancel();
    } else {
      // shopId가 null인 경우 아무 작업도 하지 않음
      console.log('Invalid shopId: null');
    }
  };

  const handleClearSelection = () => {
    setSelectedPlace(null);
    setSearchResults([]);
    setIsResultsVisible(false);
    setSearchKeyword(''); // 선택 해제 후 검색어 초기화
    onShopSelect(null); // selectedShopId 초기화
  };

  return (
    <div className="relative w-full px-5">
      <p className="font-semibold mb-[6px]">장소 입력</p>
      <p className="mb-3 text-[12px]">
        <span className="text-primaryRed1">최근 방문한 가게</span>를 쉽게 선택해
        보세요!
      </p>
      {selectedPlace ? (
        <div className="flex items-center border border-grayscale300 p-2 rounded-[4px]">
          <Image src={MapIcon} alt="Map Icon" className="w-5 h-5 mr-2" />
          <span className="flex-grow text-[14px]">{selectedPlace}</span>
          <button
            onClick={handleClearSelection}
            className="text-grayscale500 hover:text-gray-700 pr-1"
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
            className="w-full text-[14px] p-2 pl-8 pr-10 border border-grayscale300 rounded-[4px] caret-primaryRed1 focus:outline-none"
          />
          <Image
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-2 w-5 h-5 cursor-pointer"
          />
        </div>
      )}

      {/* 최근 주문한 가게 표시 */}
      {!selectedPlace && recentOrders.length > 0 && (
        <div className="mt-[10px] flex gap-2 flex-wrap">
          {recentOrders.map((order, index) => (
            <button
              key={`${order.shopId}-${index}`} // 고유한 key로 shopId와 index 조합
              onClick={() => handleSelectResult(order.shopId, order.shopName)}
              className="px-3 py-[6px] bg-grayscale200 rounded-full text-[12px] hover:bg-gray-200"
            >
              {order.shopName}
            </button>
          ))}
        </div>
      )}

      {isResultsVisible && (
        <>
          {searchResults.length > 0 ? (
            <div
              className="absolute z-10 left-5 right-5 bg-white border border-grayscale300 rounded-b-[4px] shadow-lg h-auto max-h-[200px] overflow-y-auto scrollbar-hidden"
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
                    <div className="text-sm font-medium text-grayscale900">
                      {result.shopName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mx-2 mt-2">
              검색 결과가 없습니다.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSearch;
