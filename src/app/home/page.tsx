'use client';
import Header from '../_components/Header';
import CakeWay from '../../../public/header-images/cake-way.svg';
import Alarm from '../../../public/header-images/alarm.svg';
import Image from 'next/image';
import InputField from '../_components/InputField';
import CakePick from '../_components/home/CakePick';
import CategoryCake from '../_components/home/CategoryCake';
import CakeRecommend from '../_components/home/CakeRecommend';
import { useState } from 'react';
import CurrentPosition from '../_components/home/CurrentPosition';
import useHomeLocationStore from '../store/homeLocationStore';
// import { useEffect } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const clickedCurrentPosition = () => {
    setIsOpen(true);
  };
  const { homeLocation } = useHomeLocationStore();
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  // }, []);
  return (
    <>
      <Header
        leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
        centerComponent={
          <InputField placeholder=" 원하는 케이크 찾으러 가기" />
        }
        rightButtonImage={[<Image key="Alarm" src={Alarm} alt="Alarm" />]}
      />

      <CakePick />
      <CategoryCake />
      <div className="my-7  h-2 bg-[#f4f4f4]"></div>

      {/* 위치설정 */}
      <div
        className="flex gap-1.5 px-5 cursor-pointer"
        onClick={clickedCurrentPosition}
      >
        <Image
          src={'/shop/positionIcon.svg'}
          alt="position_icon"
          width={14}
          height={14}
        />
        <div className="text-[#4f4f4f] text-sm font-medium">{homeLocation}</div>
        <Image
          src={'/order/arrow_down.svg'}
          alt="position_icon"
          width={14}
          height={14}
        />
      </div>
      <CakeRecommend />
      {isOpen && <CurrentPosition setIsOpen={setIsOpen} isOpen={isOpen} />}
    </>
  );
}
