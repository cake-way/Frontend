'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import SettingIcon from '../../../public/header-images/setting.svg';
import AlarmIcon from '../../../public/header-images/alarm-fill.svg';

import Header from '../_components/Header';
import UserInfo from '../_components/my-log/UserInfo';
import SavedCake from '../_components/my-log/SavedCake';
import SavedStore from '../_components/my-log/SavedStore';
import SavedLog from '../_components/my-log/SavedLog';
import { useEffect } from 'react';
import { fetchUserInfo } from '../_lib/api/userInfo';
import useUserStore from '../store/userStore';

const MyLog = () => {
  const router = useRouter();

  const setUserInfo = useUserStore((state) => state.setUserInfo); // 로그인한 사용자 관리

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  useEffect(() => {
    const fetchAndSetUserInfo = async () => {
      const userData = await fetchUserInfo();
      if (userData) {
        setUserInfo(userData); // Zustand에 사용자 정보 저장
      }
    };

    fetchAndSetUserInfo();
  }, [setUserInfo]);

  return (
    <main className="w-full">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="마이페이지"
        rightButtonImage={[
          <Image
            key="Alarm"
            width={24}
            height={24}
            src={AlarmIcon}
            alt="Alarm"
          />,
          <Image
            key="Setting"
            width={24}
            height={24}
            src={SettingIcon}
            alt="Setting"
          />,
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
