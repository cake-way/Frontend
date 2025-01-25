import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { fetchCakesData, fetchShopsData } from '@/app/_lib/api/searchResults';
import MarkIcon from '../Icons/MarkIcon';

interface Cake {
  cakeId: number;
  name: string;
  imageUrl: string;
  price: number;
  scrapCount: number;
  shopName: string;
}

interface Shop {
  shopId: number;
  name: string;
  address: string;
  contact: string;
  thumbnailImage: string;
  distance: number;
}

const SearchResults = ({ keyword = '', latitude = 0, longitude = 0 }) => {
  const [cakeResults, setCakeResults] = useState<Cake[]>([]);
  const [shopResults, setShopResults] = useState<Shop[]>([]);
  const [activeTab, setActiveTab] = useState<'cake' | 'shop'>('cake');

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword) return;

      try {
        const [cakes, shops] = await Promise.all([
          fetchCakesData(keyword),
          fetchShopsData(keyword, latitude, longitude),
        ]);

        console.log(latitude);
        console.log(longitude);
        setCakeResults(cakes);
        console.log(cakes);
        console.log(shops);
        setShopResults(shops);
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

  return (
    <div className="search-results">
      <div className="tab-buttons flex gap-[18px]">
        <button
          className={`py-2.5 text-center w-1/2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'cake'
              ? 'border-black text-black'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => setActiveTab('cake')}
        >
          케이크
        </button>
        <button
          className={`py-2.5 text-center w-1/2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'shop'
              ? 'border-black text-black'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => setActiveTab('shop')}
        >
          가게
        </button>
      </div>

      <div className="results-container px-5 pb-44 max-h-screen overflow-y-auto scrollbar-hide">
        {activeTab === 'cake' ? (
          <div className="grid grid-cols-2 gap-2 w-full pt-5">
            {cakeResults.length > 0 ? (
              cakeResults.map((cake) => (
                <div key={cake.cakeId} className="relative w-full h-auto">
                  <div className="relative w-full h-[226px]">
                    <img
                      src={`https://drive.google.com/thumbnail?id=${cake.imageUrl.split('/d/')[1].split('/view')[0]}`}
                      alt={cake.name}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>

                  {/* 케이크 이름과 가격 (이미지 아래) */}
                  <div className="pt-[5px] pb-[10px] text-sm font-bold">
                    <h3 className="text-sm">{cake.name}</h3>
                    <p className="text-[12px]">{cake.price}원~</p>
                  </div>
                  {/* 마크 토글 버튼 */}
                  <button className="absolute top-2 right-2 z-10">
                    <MarkIcon fill="white" />
                  </button>
                </div>
              ))
            ) : (
              <p className=" mt-5">해당 키워드와 관련된 케이크가 없습니다.</p>
            )}
          </div>
        ) : (
          <div className="shop-results">
            {shopResults.length > 0 ? (
              shopResults.map((shop, index) => (
                <div
                  key={shop.shopId}
                  className={`shop-item ${index !== shopResults.length - 1 ? 'border-b' : ''} py-6`}
                >
                  <div className="shop-header flex items-center">
                    <h3 className="shop-name text-lg font-bold mr-3 flex-grow">
                      {shop.name}
                    </h3>
                    <div className="shop-marker text-xl">
                      <MarkIcon fill="black" />
                    </div>
                  </div>
                  <p className="shop-address text-sm mb-3">{shop.address}</p>
                  <div className="shop-image">
                    <img
                      src={`https://drive.google.com/thumbnail?id=${shop.thumbnailImage.split('/d/')[1].split('/view')[0]}`}
                      alt={shop.name}
                      className="w-20 h-20 object-cover rounded-lg "
                    />
                  </div>
                </div>
              ))
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
