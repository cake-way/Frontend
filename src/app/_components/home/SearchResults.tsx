import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import {
  fetchCakesData,
  fetchShopsData,
  scrapCake,
  scrapShop,
} from '@/app/_lib/api/searchResults';
import MarkIcon from '../Icons/MarkIcon';
import FilledMarkIcon from '../Icons/FilledMarkIcon';
import { Cake, Shop } from 'types/home/searchResult';
import { useRouter } from 'next/navigation';

const SearchResults = ({ keyword = '', latitude = 0, longitude = 0 }) => {
  const [cakeResults, setCakeResults] = useState<Cake[]>([]);
  const [shopResults, setShopResults] = useState<Shop[]>([]);
  const [activeTab, setActiveTab] = useState<'cake' | 'shop'>('cake');

  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword) return;

      try {
        const [cakes, shops] = await Promise.all([
          fetchCakesData(keyword),
          fetchShopsData(keyword, latitude, longitude),
        ]);

        setCakeResults(cakes);
        setShopResults(shops);
        console.log(shops);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      }
    };

    const debouncedFetch = debounce(fetchResults, 300);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [keyword, latitude, longitude]);

  const handleScrapCake = async (cakeId: number) => {
    try {
      const success = await scrapCake(cakeId);
      if (success) {
        setCakeResults((prevCakes) =>
          prevCakes.map((cake) =>
            cake.cakeId === cakeId
              ? { ...cake, isScrapped: !cake.isScrapped }
              : cake
          )
        );
      }
    } catch (error: unknown) {
      console.error('에러 디버깅:', error); // 에러 객체 전체 확인
      if (
        error instanceof Error &&
        error.message.includes('스크랩에 실패했습니다')
      ) {
        alert('이미 스크랩하셨습니다!');
      } else {
        console.error('스크랩 API 호출 중 오류:', error);
      }
    }
  };

  const handleScrapShop = async (shopId: number, index: number) => {
    try {
      const shop = shopResults[index];
      const success = await scrapShop(shopId, shop.isScrapped); // 분리된 API 호출
      if (success) {
        setShopResults((prevShops) =>
          prevShops.map((s, i) =>
            i === index ? { ...s, isScrapped: !s.isScrapped } : s
          )
        );
      }
    } catch (error: unknown) {
      console.error('에러 디버깅:', error); // 에러 객체 전체 확인
      if (
        error instanceof Error &&
        error.message.includes('가게 스크랩 처리에 실패했습니다')
      ) {
        alert('이미 스크랩하셨습니다!');
      } else {
        console.error('스크랩 API 호출 중 오류:', error);
      }
    }
  };

  return (
    <div className="search-results">
      <div className="tab-buttons flex gap-[18px]">
        <button
          className={`py-2.5 text-center w-1/2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'cake'
              ? 'border-black text-black'
              : 'border-transparent text-grayscale600'
          }`}
          onClick={() => setActiveTab('cake')}
        >
          케이크
        </button>
        <button
          className={`py-2.5 text-center w-1/2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'shop'
              ? 'border-black text-black'
              : 'border-transparent text-grayscale600'
          }`}
          onClick={() => setActiveTab('shop')}
        >
          가게
        </button>
      </div>

      <div className="results-container px-5 pb-44 max-h-screen overflow-y-auto scrollbar-hide">
        {activeTab === 'cake' ? (
          <>
            {cakeResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 w-full pt-5">
                {cakeResults.map((cake) => (
                  <div key={cake.cakeId} className="relative w-full h-auto">
                    <div className="relative w-full h-[226px]">
                      <img
                        src={cake.imageUrl}
                        alt={cake.name}
                        onClick={() => {
                          router.push(`/cakeDetail/${cake.cakeId}`);
                        }}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>

                    <div className="pt-[5px] pb-[10px] text-sm font-bold">
                      <h3 className="text-sm">{cake.name}</h3>
                      <p className="text-[12px]">{cake.price}원~</p>
                    </div>

                    <button
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleScrapCake(cake.cakeId)}
                    >
                      {cake.isScrapped ? (
                        <FilledMarkIcon />
                      ) : (
                        <MarkIcon fill="white" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full">
                <p className="mt-5">해당 키워드와 관련된 케이크가 없습니다.</p>
              </div>
            )}
          </>
        ) : (
          <div className="shop-results">
            {shopResults.length > 0 ? (
              <div className="shop-results">
                {shopResults.map((shop, index) => {
                  const latestFourCakes = shop.cakes.slice(-4); // 각 가게의 cakes 배열에서 마지막 4개만 선택

                  return (
                    <div
                      key={shop.shopId}
                      className={`shop-item ${index !== shopResults.length - 1 ? 'border-b' : ''} py-6`}
                    >
                      <div
                        className="shop-header flex items-center cursor-pointer"
                        onClick={() => {
                          router.push(`/shop/${shop.shopId}`);
                        }}
                      >
                        <h3 className="shop-name text-lg font-bold mr-3 flex-grow">
                          {shop.name}
                        </h3>
                        <div className="shop-marker text-xl">
                          <button
                            onClick={() => handleScrapShop(shop.shopId, index)}
                          >
                            {shop.isScrapped ? (
                              <FilledMarkIcon fill="black" />
                            ) : (
                              <MarkIcon fill="black" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="shop-address text-sm mb-3">
                        {shop.address}
                      </p>

                      {/* 각 가게의 케이크 이미지 4개만 렌더링 */}
                      <div className="shop-cakes flex gap-0.5">
                        {latestFourCakes.map((cake) => (
                          <div key={cake.cakeId} className="w-1/4">
                            <img
                              src={cake.imageUrl}
                              alt={cake.name}
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-5">
                해당 키워드와 관련된 케이크 가게가 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
