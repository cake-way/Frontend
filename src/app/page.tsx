import Header from './components/Header';
import CakeWay from '../../public/cake-way.svg';
import Alarm from '../../public/alarm.svg';
import Image from 'next/image';
import InputField from './components/InputField';

export default function Home() {
  return (
    <div>
      <Header
        leftButtonImage={
          <Image src={CakeWay} alt="Cake Way" width={24} height={24} />
        }
        centerComponent={
          <InputField placeholder=" 원하는 케이크를 찾으러 가기" />
        }
        rightButtonImage={
          <Image src={Alarm} alt="Alarm" width={24} height={24} />
        }
      />
    </div>
  );
}
