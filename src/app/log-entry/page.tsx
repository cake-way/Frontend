'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';

import Header from '../components/Header';
import CreatLog from '../components/log-entry/CreateLog';
import MyCakeLog from '../components/log-entry/MyCakeLog';

const LogEntry = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  return (
    <>
      <Header
        leftButtonImage={<Image src={BackIcon} alt="Back Icon" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="케이크 로그 작성"
        rightButtonImage={[
          <Image key="Alarm" src={AlarmIcon} alt="Alarm Icon" />,
        ]}
        onRightButtonClick={[handleRightButtonClick]}
        borderBottom={true}
      />
      <main className="w-full pt-[75px] px-5">
        <CreatLog />
        <MyCakeLog />
      </main>
    </>
  );
};

export default LogEntry;
