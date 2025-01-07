'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import KakaoIcon from '../../../public/Login/kakao.svg';

const Login = () => {
  const router = useRouter();

  return (
    <main className="w-full h-screen bg-black flex flex-col items-center text-white font-sans">
      <section className="mt-[277px]">
        <span>로고 자리</span>
      </section>

      <section className="mb-[275px] text-center text-sm">
        <p className="mt-[17px]">쉽고 빠른 케이크 주문은 케이크 웨이로</p>
      </section>

      <button
        className="flex items-center justify-start gap-[42px] w-[282px] h-[44px] bg-[#F7E409] text-black rounded-sm px-[20px]"
        onClick={() => {
          router.push('/'); // 임시 라우팅
        }}
      >
        <Image src={KakaoIcon} alt="카카오 아이콘" />
        <span className="text-body2">카카오로 시작하기</span>
      </button>
    </main>
  );
};

export default Login;
