'use client';

import Image from 'next/image';

import Header from '@/app/components/Header';
import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import { useRouter } from 'next/navigation';

const CakeDesigns = () => {
  const router = useRouter();
  return (
    <main className="w-full h-screen flex flex-col items-center text-white font-sans">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 디자인"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        borderBottom={true}
      />
    </main>
  );
};

export default CakeDesigns;
