import Image from 'next/image';
import { getHoursMinutes } from '../../../../utils/utils';

import RunTimeIcon from '../Icons/RunTimeIcon';
import MapMarkIcon from '@/app/_components/map/MapMarkIcon';
import { useRouter } from 'next/navigation';
import { IShopDetail, MapShops } from 'types/relatedCake';
import { useQuery } from '@tanstack/react-query';
import shopDetailApi from '@/app/_lib/shopApi';
import { useEffect, useState } from 'react';
import { scrapShop } from '@/app/_lib/api/searchResults';
import { fetchStoreScrapData, StoreScrap } from '@/app/_lib/api/storeScrap';

interface ICakeShopCard {
  shop: MapShops;
}

const CakeShopCard = ({ shop }: ICakeShopCard) => {
  const router = useRouter();
  const [marked, setMarked] = useState<number | null>(Date.now());
  const [runtime, setRuntime] = useState<number | null>(null);
  const [closeTime, setCloseTime] = useState('');

  const { data: shopDetail, refetch: refetchShopDetail } =
    useQuery<IShopDetail>({
      queryKey: ['shopDetail', shop.shopId, marked],
      queryFn: () => shopDetailApi(shop.shopId),
      enabled: !!shop.shopId,
    });
  const { data: shopScrap, refetch } = useQuery<StoreScrap[]>({
    queryKey: ['shopScrap', marked],
    queryFn: () => fetchStoreScrapData(),
  });

  // 데이터 변경 시 실행
  useEffect(() => {
    if (shopDetail?.operatingHour?.closeTime) {
      const now = new Date();
      const totalNowMinutes = now.getHours() * 60 + now.getMinutes();
      const closeTime = getHoursMinutes(shopDetail.operatingHour.closeTime);

      if (closeTime) {
        const [closeHours, closeMinutes] = closeTime;
        const totalMinutes = closeHours * 60 + closeMinutes;
        setRuntime(totalNowMinutes - totalMinutes);
      }
      setCloseTime(shopDetail.operatingHour.closeTime);
    }
  }, [shopDetail]);

  const handleScrapCake = async () => {
    try {
      if (shopScrap?.find((i) => i.shopId === shop.shopId)) {
        const response = await scrapShop(shop.shopId, true);
        if (response) setMarked(Date.now());
      } else {
        const isScraped = await scrapShop(shop.shopId, false);
        if (isScraped) {
          setMarked(Date.now());
        }
      }
      // 스크랩 작업 후 데이터 다시 가져오기
      await refetchShopDetail();
      await refetch();
    } catch (error) {
      console.error('스크랩 API 호출 중 오류:', error);
    }
  };

  //스크랩은 가게 스크랩이 아닌 유저의 스크랩으로 변경해야함
  return (
    <div className="max-w-md mx-auto rounded-xl  overflow-hidden">
      <div className="flex justify-between items-center ">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/shop/${shop.shopId}`)}
        >
          <h2 className="text-sm font-bold">{shop.name}</h2>
          {runtime && (
            <div className="flex items-center gap-[2px]">
              <RunTimeIcon color={runtime < 0 ? '#DCDA75' : '#FA2840'} />
              <span className="text-xs text-grayscale700 flex gap-[5px]">
                <span className="text-grayscale900">
                  {runtime < 0 ? '영업중' : '마감'}
                </span>
                {closeTime} 에 마감
              </span>
            </div>
          )}
        </div>
        <button onClick={handleScrapCake}>
          {shopDetail?.scraped ? (
            <MapMarkIcon />
          ) : (
            <Image src="./map/mark.svg" width={24} height={24} alt="mark" />
          )}
        </button>
      </div>

      <div
        className=" overflow-x-auto cursor-pointer pt-2 grid gap-[2px] grid-flow-col  relative auto-cols-[25%] "
        onClick={() => router.push(`/shop/${shop.shopId}`)}
      >
        {shop?.cakes?.map((i, index) => (
          <Image
            key={index}
            src={i.imageUrl}
            alt={i.name}
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-square overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
};

export default CakeShopCard;
