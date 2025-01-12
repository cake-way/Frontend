import Header from './components/Header';
import CakeWay from '../../public/header-images/cake-way.svg';
import Alarm from '../../public/header-images/alarm.svg';
import Image from 'next/image';
import InputField from './components/InputField';
import CakePick from './components/home/CakePick';
import CategoryCake from './components/home/CategoryCake';
import CakeRecommend from './components/home/CakeRecommend';

export default function Home() {
  return (
    <>
      <div className="h-[calc(100dvh-var(--bottom-nav-height))] flex flex-col ]">
        <Header
          leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
          centerComponent={
            <InputField placeholder=" 원하는 케이크 찾으러 가기" />
          }
          rightButtonImage={<Image src={Alarm} alt="Alarm" />}
        />

        <CakePick />
        <CategoryCake />
      </div>
      <CakeRecommend />
    </>
  );
}
