import Header from '../_components/Header';
import CakeWay from '../../../public/header-images/cake-way.svg';
import Alarm from '../../../public/header-images/alarm.svg';
import Image from 'next/image';
import InputField from '../_components/InputField';
import CakePick from '../_components/home/CakePick';
import CategoryCake from '../_components/home/CategoryCake';
import CakeRecommend from '../_components/home/CakeRecommend';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);
  return (
    <>
      <div className="h-[calc(100dvh-var(--bottom-nav-height))] flex flex-col ]">
        <Header
          leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
          centerComponent={
            <InputField placeholder=" 원하는 케이크 찾으러 가기" />
          }
          rightButtonImage={[<Image key="Alarm" src={Alarm} alt="Alarm" />]}
        />

        <CakePick />
        <CategoryCake />
      </div>
      <CakeRecommend />
    </>
  );
}
