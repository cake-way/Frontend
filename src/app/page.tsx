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
    <div className="w-full">
      <Header
        leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
        centerComponent={
          <InputField placeholder=" 원하는 케이크 찾으러 가기" />
        }
        rightButtonImage={[<Image key="Alarm" src={Alarm} alt="Alarm" />]}
      />
      <CakePick />
      <CategoryCake />
      <CakeRecommend />
    </div>
  );
}
