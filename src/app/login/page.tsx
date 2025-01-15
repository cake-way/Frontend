'use client';

import Image from 'next/image';

import KakaoIcon from '../../../public/login-images/kakao.svg';
import CakeWayLogo from '../../../public/login-images/cake-way.svg';

const Login = () => {
  const handleKakaoLogin = async () => {
    try {
      // 서버에서 카카오 인증 URL을 생성한 후 리디렉션
      const response = await fetch('/api/auth');
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authUrl; // 서버에서 받은 URL로 리디렉션
      } else {
        throw new Error('카카오 인증 URL 생성 실패');
      }
    } catch (error) {
      console.error('카카오 로그인 오류:', error);
    }
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
