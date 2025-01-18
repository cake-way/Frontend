'use client';

import Image from 'next/image';

import CakeWayLogo from '../../public/login-images/cake-way.svg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <main className="w-full h-screen bg-black flex flex-col items-center text-white font-sans">
      <section className="mt-[300px]">
        <Image src={CakeWayLogo} alt="cake-way 로고" />
      </section>

      <section className="mb-[275px] text-center text-md">
        <p className="mt-[17px]">쉽고 빠른 케이크 주문은 케이크 웨이로</p>
      </section>
    </main>
  );
};

export default LandingPage;
