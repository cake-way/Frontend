'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';

import Header from '../_components/Header';
import CreateLog from '../_components/log-entry/CreateLog';
import MyCakeLog from '../_components/log-entry/MyCakeLog';

const LogEntry = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  return (
    <div>
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
      <main className="w-full px-5">
        <CreateLog />
        <MyCakeLog />
      </main>
    </div>
  );
};

export default LogEntry;
