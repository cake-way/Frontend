'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import SettingIcon from '../../../public/header-images/setting.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';

import Header from '../_components/Header';
import UserInfo from '../_components/my-log/UserInfo';
import SavedCake from '../_components/my-log/SavedCake';
import SavedStore from '../_components/my-log/SavedStore';
import SavedLog from '../_components/my-log/SavedLog';

const MyLog = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  return (
    <main className="w-full">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="마이페이지"
        rightButtonImage={[
          <Image key="Alarm" src={AlarmIcon} alt="Alarm" />,
          <Image key="Setting" src={SettingIcon} alt="Setting" />,
        ]}
        onRightButtonClick={[handleRightButtonClick]}
      />
      {/*사용자 프로필*/}
      <UserInfo />

      {/*프로필 수정 버튼*/}
      <section className="px-5 mt-[20px]">
        <button
          onClick={() => {
            router.push('/profileEdit');
          }}
          className="w-full h-[38px] text-[14px] font-semibold border border-grayscale500 rounded-[4px]"
        >
          프로필 수정
        </button>
      </section>

      {/*저장한 데이터*/}
      <SavedCake />
      <SavedStore />
      <SavedLog />
    </main>
  );
};

export default MyLog;
