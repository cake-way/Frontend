'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import SettingIcon from '../../../public/header-images/setting.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';
import Profile from '../../../public/my-log-images/profile-photo.svg'; // 기본 이미지

import Cake1 from '../../../public/my-log-images/cake-1.svg';
import Cake2 from '../../../public/my-log-images/cake-2.svg';
import Cake3 from '../../../public/my-log-images/cake-3.svg';
import Cake4 from '../../../public/my-log-images/cake-4.svg';

import Store1 from '../../../public/my-log-images/store-1.svg';

import Log1 from '../../../public/my-log-images/log.jpg';
import Log2 from '../../../public/my-log-images/log.jpg';

import Header from '../_components/Header';
import UserInfo from '../_components/my-log/UserInfo';
import SavedCake from '../_components/my-log/SavedCake';
import SavedStore from '../_components/my-log/SavedStore';
import SavedLog from '../_components/my-log/SavedLog';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const MyLog = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    profileImage: Profile.src, // 기본 이미지 처리
    nickname: '',
    introduction: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('인증 토큰이 없습니다.');
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/mypage`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const user = data.userInfo;
          console.log(data);
          setUserInfo({
            profileImage: user.profileImage || Profile.src, // 응답 이미지 또는 기본 이미지 (기본 이미지 필요)
            nickname: user.username,
            introduction:
              user.description ||
              '소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요. 소개글을 작성해 보세요.', // 기본 소개글 처리
          });
        } else {
          console.error(
            '사용자 정보를 가져오지 못했습니다:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  // 케이크 이미지 배열
  const cakeData = [
    { src: Cake1, alt: 'Cake 1' },
    { src: Cake2, alt: 'Cake 2' },
    { src: Cake3, alt: 'Cake 3' },
    { src: Cake4, alt: 'Cake 4' },
  ];

  // 저장한 가게 데이터 배열
  const storeData = [
    {
      storeImage: Store1,
      isSameDayReservation: true,
      storename: '카페 한잔',
      openingHours: '08:00 ~ 22:00',
      address: '서울특별시 강남구 카페로 123',
    },
    {
      storeImage: Store1,
      isSameDayReservation: true,
      storename: '카페 두잔',
      openingHours: '09:00 ~ 21:00',
      address: '서울특별시 서초구 카페로 456',
    },
  ];

  const logData = [
    {
      src: Log1,
      title: '집들이 파티에 빠질 수 없는 케이크 가게 8곳',
      cakeLogid: '1',
    },
    { src: Log2, title: '고급스러운\n티아라 케이크 5곳', cakeLogid: '2' },
  ];

  return (
    <main className="w-full">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="마이페이지"
        rightButtonImage={[
          <Image key="Alarm" src={AlarmIcon} alt="Alarm" />,
          <Image key="setting" src={SettingIcon} alt="setting" />,
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
