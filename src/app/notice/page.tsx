'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '../_components/Header';
import BackIcon from '../../../public/header-images/back.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';
import FilledAlarmIcon from '../../../public/header-images/alarm-fill.svg';

const Notice = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const headerProps = {
    leftButtonImage: <Image src={BackIcon} alt="back" />,
    onLeftButtonClick: handleLeftButtonClick,
    centerText: '알림',
    rightButtonImage: [
      <Image
        width={24}
        height={24}
        key="setting"
        src={FilledAlarmIcon}
        alt="setting"
      />,
    ],
  };

  return (
    <main className="w-full">
      <Header {...headerProps} />
      <div className="flex flex-col gap-2 items-center justify-center mt-48">
        <Image
          width={56}
          height={56}
          key="setting"
          src={AlarmIcon}
          alt="setting"
        />
        <p className="text-center text-[14px] text-grayscale500">
          아직 도착한 알림이 없어요
        </p>
      </div>
    </main>
  );
};

export default Notice;
