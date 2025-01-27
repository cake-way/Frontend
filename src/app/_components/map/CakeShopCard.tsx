import Image from 'next/image';
import { getHoursMinutes } from '../../../../utils/utils';

import RunTimeIcon from '../Icons/RunTimeIcon';
import MapMarkIcon from '@/app/_components/map/MapMarkIcon';
import { useRouter } from 'next/navigation';
import { IShopDetail, MapShops } from 'types/relatedCake';
import { useQuery } from '@tanstack/react-query';
import shopDetailApi from '@/app/_lib/shopApi';

interface ICakeShopCard {
  shop: MapShops;
}
const CakeShopCard = ({ shop }: ICakeShopCard) => {
  const router = useRouter();
  const { data: shopDetail } = useQuery<IShopDetail>({
    queryKey: ['shopDetail', shop.shopId],
    queryFn: () => shopDetailApi(shop.shopId),
    enabled: !!shop.shopId,
  });
  //영업중, 마감인지
  const getRunTime = () => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const totalNowMinutes = nowHours * 60 + nowMinutes;

    const [hours, minutes] = getHoursMinutes(
      shopDetail?.operatingHour?.closeTime
    );
    const totalMinutes = hours * 60 + minutes;

    return totalNowMinutes - totalMinutes;
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
          <div className="flex items-center gap-[2px]">
            <RunTimeIcon color={getRunTime() < 0 ? undefined : '#FA2840'} />
            <span className="text-xs text-grayscale700 flex gap-[5px]">
              <span className="text-grayscale900">
                {getRunTime() < 0 ? '영업중' : '마감'}
              </span>
              {shopDetail?.operatingHour?.closeTime} 에 라스트 오더
            </span>
          </div>
        </div>
        {shopDetail?.scraped ? (
          <MapMarkIcon />
        ) : (
          <Image src="./map/mark.svg" width={24} height={24} alt="mark" />
        )}
      </div>

      <div
        className=" overflow-x-auto cursor-pointer pt-2 grid gap-[2px] grid-flow-col auto-cols-[25%] "
        onClick={() => router.push(`/shop/${shop.shopId}`)}
      >
        {shop?.cakes?.map((i, index) => (
          <img
            key={index}
            src={i.imageUrl}
            alt={i.name}
            className="w-full object-cover "
          />
        ))}
      </div>
    </div>
  );
};

export default CakeShopCard;
