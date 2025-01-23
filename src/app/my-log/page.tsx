'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import SettingIcon from '../../../public/header-images/setting.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';
import Profile from '../../../public/my-log-images/profile-photo.svg'; // 기본 이미지

import Header from '../_components/Header';
import UserInfo from '../_components/my-log/UserInfo';
import SavedCake from '../_components/my-log/SavedCake';
import SavedStore from '../_components/my-log/SavedStore';
import SavedLog from '../_components/my-log/SavedLog';

import { fetchUserInfo } from '../_lib/api/userInfo';

const MyLog = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    profileImage: Profile.src, // 기본 이미지 처리
    nickname: 'melloy23',
    introduction:
      '소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요.', // 기본 소개글
  });

  const [cakeData, setCakeData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('인증 토큰이 없습니다.');
        return;
      }

      try {
        const user = await fetchUserInfo(token);
        const { userInfo, designScrap, storeScrap, logScrap } = user;

        // 사용자 정보 업데이트
        setUserInfo({
          profileImage: userInfo.profileImage || Profile.src,
          nickname: userInfo.username || 'melloy23',
          introduction:
            userInfo.description ||
            '소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요.',
        });

        // 스크랩된 케이크, 가게, 로그 데이터 업데이트
        setCakeData(designScrap || []);
        setStoreData(storeScrap || []);
        setLogData(logScrap || []);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchUserData();
  }, []);

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

      <UserInfo
        profileImage={userInfo.profileImage}
        nickname={userInfo.nickname}
        introduction={userInfo.introduction}
      />

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

      <SavedCake cakes={cakeData} />
      <SavedStore stores={storeData} />
      <SavedLog savedLog={logData} />
    </main>
  );
};

export default MyLog;
