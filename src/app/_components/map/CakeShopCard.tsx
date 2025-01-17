import Image from 'next/image';
import { getHoursMinutes } from '../../../../utils/utils';

import RunTimeIcon from '../Icons/RunTimeIcon';
import MapMarkIcon from '@/app/_components/map/MapMarkIcon';
import { useRouter } from 'next/navigation';

interface ICakeShopCard {
  shop: {
    name: string;
    close_time: string;
    scrap_count: number;
    shop_id: number;
  };
}
const CakeShopCard = ({ shop }: ICakeShopCard) => {
  const router = useRouter();

  //영업중, 마감인지
  const getRunTime = () => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const totalNowMinutes = nowHours * 60 + nowMinutes;

    const [hours, minutes] = getHoursMinutes(shop.close_time);
    const totalMinutes = hours * 60 + minutes;

    return totalNowMinutes - totalMinutes;
  };

  //스크랩은 가게 스크랩이 아닌 유저의 스크랩으로 변경해야함
  return (
    <div className="max-w-md mx-auto rounded-xl  overflow-hidden">
      <div className="flex justify-between items-center ">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/shop/${shop.shop_id}`)}
        >
          <h2 className="text-sm font-bold">{shop.name}</h2>
          <div className="flex items-center gap-[2px]">
            <RunTimeIcon color={getRunTime() < 0 ? undefined : '#FA2840'} />
            <span className="text-xs text-grayscale700 flex gap-[5px]">
              <span className="text-grayscale900">
                {getRunTime() < 0 ? '영업중' : '마감'}
              </span>
              {shop.close_time} 에 라스트 오더
            </span>
          </div>
        </div>
        {shop.scrap_count > 0 ? (
          <MapMarkIcon />
        ) : (
          <Image src="./map/mark.svg" width="24" height={24} alt="mark" />
        )}
      </div>

      <div
        className="cursor-pointer pt-2 grid grid-cols-4 gap-[2px]"
        onClick={() => router.push(`/shop/${shop.shop_id}`)}
      >
        <img
          src="/map/image.svg"
          alt="분홍색 딸기 케이크"
          className="w-full object-cover "
        />
        <img
          src="/map/image.svg"
          alt="화이트 딸기 케이크"
          className="w-full object-cover "
        />
        <img
          src="/map/image.svg"
          alt="하늘색 딸기 케이크"
          className="w-full object-cover "
        />
        <img
          src="/map/image.svg"
          alt="화이트 크라운 딸기 케이크"
          className="w-full object-cover "
        />
      </div>
    </div>
  );
};

export default CakeShopCard;
