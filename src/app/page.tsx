'use client';

import Image from 'next/image';
import CakeWayLogo from '../../public/login-images/cake-way.svg';
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
    <main className="w-full h-screen bg-black flex flex-col items-center text-white font-sans">
      <motion.section
        className="mt-[20vh] sm:mt-[25vh] md:mt-[10vh]"
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom' }}
      >
        <Image src={CakeWayLogo} alt="cake-way 로고" />
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
