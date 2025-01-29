'use client';

import Image from 'next/image';
import KakaoIcon from '../../../public/login-images/kakao.svg';
import CakeWayLogo from '../../../public/login-images/cake-way.svg';

const Login = () => {
  const handleKakaoLogin = async () => {
    try {
      const response = await fetch('/api/auth'); // app key 감추기 위해 next 서버 이용
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authUrl; // 디벨로퍼에서 설정한 URL로 리디렉션
      } else {
        throw new Error('카카오 인증 URL 생성 실패');
      }
    } catch (error) {
      console.error('카카오 로그인 오류:', error);
    }
  };

  return (
    <main className="w-full h-screen bg-black flex flex-col items-center text-white font-sans relative px-4">
      <section className="mt-[20vh] sm:mt-[25vh] md:mt-[10vh]">
        <Image src={CakeWayLogo} alt="cake-way 로고" className="w-full" />
      </section>

      <section className="text-center text-md">
        <p className="mt-4">쉽고 빠른 케이크 주문은 케이크 웨이로</p>
      </section>

      <button
        className="fixed bottom-5 flex mb-32 items-center justify-start gap-[40px] sm:gap-[50px] md:gap-[60px] lg:gap-[70px]
        w-[280px] sm:w-[300px] md:w-[330px] lg:w-[360px]
        h-[45px] sm:h-[48px] md:h-[50px] lg:h-[55px]
        bg-[#F7E409] text-black rounded-[4px] px-4 sm:px-5 md:px-6"
        onClick={handleKakaoLogin}
      >
        <Image
          src={KakaoIcon}
          alt="카카오 아이콘"
          className="w-6 sm:w-7 md:w-8"
        />
        <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium">
          카카오로 시작하기
        </span>
      </button>
    </main>
  );
};

export default Login;
