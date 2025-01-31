'use client';

import Image from 'next/image';
import CakeWayLogo from '../../public/login-images/cakeway-logo.svg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="w-full h-screen bg-[#000] flex flex-col items-center text-white font-sans relative px-4">
      <motion.section
        className="mt-[var(--dynamic-mt)]"
        style={
          {
            '--dynamic-mt': 'min(30vh, 274px)', // 화면 높이의 30% 또는 최대 274px
          } as React.CSSProperties
        }
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image src={CakeWayLogo} alt="cake-way 로고" className="w-full" />
      </motion.section>

      <motion.section className="mb-[275px] text-center text-md flex ">
        <motion.p
          className="mt-[17px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          쉽고 빠른
        </motion.p>
        <motion.p
          className="mt-[17px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          &nbsp;케이크 주문은
        </motion.p>
        <motion.p
          className="mt-[17px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          &nbsp;케이크 웨이로
        </motion.p>
      </motion.section>
    </main>
  );
};

export default LandingPage;
