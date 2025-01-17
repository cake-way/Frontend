import Image from 'next/image';
import { getHoursMinutes } from '../../../../utils/utils';

import RunTimeIcon from '../Icons/RunTimeIcon';
import MapMarkIcon from '@/app/_components/map/MapMarkIcon';

interface ICakeShopCard {
  name: string;
  time: string;
  scrap_count: number;
}
const CakeShopCard = ({ name, time, scrap_count }: ICakeShopCard) => {
  const getRunTime = () => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const totalNowMinutes = nowHours * 60 + nowMinutes;

    const [hours, minutes] = getHoursMinutes(time);
    const totalMinutes = hours * 60 + minutes;

    return totalNowMinutes - totalMinutes;
  };

  //스크랩은 가게 스크랩이 아닌 유저의 스크랩으로 변경해야함
  return (
    <div className="max-w-md mx-auto rounded-xl  overflow-hidden">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-sm font-bold">{name}</h2>
          <div className="flex items-center gap-[2px]">
            <RunTimeIcon color={getRunTime() < 0 ? undefined : '#FA2840'} />
            <span className="text-xs text-grayscale700 flex gap-[5px]">
              <span className="text-grayscale900">
                {getRunTime() < 0 ? '영업중' : '마감'}
              </span>
              {time} 에 라스트 오더
            </span>
          </div>
        </div>
        {scrap_count > 0 ? (
          <MapMarkIcon />
        ) : (
          <Image src="./map/mark.svg" width="24" height={24} alt="mark" />
        )}
      </div>

      <div className="pt-2 grid grid-cols-4 gap-[2px]">
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
