'use client';

import Image from 'next/image';

import KakaoIcon from '../../../public/login-images/kakao.svg';
import CakeWayLogo from '../../../public/login-images/cake-way.svg';

const Login = () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI; // login/callback으로 인증 코드 보내기

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <main className="w-full h-screen bg-black flex flex-col items-center text-white font-sans">
      <section className="mt-[300px]">
        <Image src={CakeWayLogo} alt="cake-way 로고" />
      </section>

      <section className="mb-[275px] text-center text-md">
        <p className="mt-[17px]">쉽고 빠른 케이크 주문은 케이크 웨이로</p>
      </section>

      <button
        className="flex items-center justify-start gap-[60px] w-[330px] h-[50px] bg-[#F7E409] text-black rounded-[4px] px-[20px]"
        onClick={handleKakaoLogin}
      >
        <Image src={KakaoIcon} alt="카카오 아이콘" />
        <span className="text-[14px] font-semibold">카카오로 시작하기</span>
      </button>
    </main>
  );
};

export default Login;
