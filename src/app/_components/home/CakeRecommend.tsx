import { useRef } from 'react';
import CakeCard from './CakeCard';
import { motion, useInView } from 'framer-motion';

const cakes = [
  {
    image: '/home/cake-1.svg',
    title: '베니케이크',
    status: '오늘 휴무',
    location: '서울/마포',
    sameDay: false,
  },
  {
    image: '/home/cake-2.svg',
    title: '커피 벌스데이',
    status: '영업 중',
    location: '서울/마포',
    sameDay: true,
  },
  {
    image: '/home/cake-3.svg',
    title: '씨케이크',
    status: '영업 중',
    location: '서울/마포',
    sameDay: true,
  },
  {
    image: '/home/cake-4.svg',
    title: 'TAND CAKE',
    status: '오늘 휴무',
    location: '서울/강남',
    sameDay: true,
  },
  {
    image: '/home/cake-4.svg',
    title: 'TAND CAKE',
    status: '오늘 휴무',
    location: '서울/강남',
    sameDay: false,
  },
];

const CakeRecommend: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, {
    once: false,
    amount: 0.3,
    margin: '0px 0px -20% 0px',
  });
  const isInView2 = useInView(ref2, {
    once: false,
    amount: 0.3,
    margin: '0px 0px -20% 0px',
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  return (
    <section className="py-4  px-5 bg-lightGray w-full">
      <div className=" mx-auto  w-full flex flex-col gap-14">
        {/* 1번 슬라이드 */}
        <motion.div
          ref={ref1}
          variants={variants}
          initial="hidden"
          animate={isInView1 ? 'visible' : 'hidden'}
        >
          <h2 className="title-2 mb-4">특별한 날, 특별한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {cakes.map((cake, index) => (
              <CakeCard
                key={index}
                image={cake.image}
                title={cake.title}
                status={cake.status}
                location={cake.location}
                sameDay={cake.sameDay}
              />
            ))}
          </div>
        </motion.div>

        {/* 2번슬라이드 */}
        <motion.div
          ref={ref2}
          variants={variants}
          initial="hidden"
          animate={isInView2 ? 'visible' : 'hidden'}
        >
          <h2 className="title-2 mb-4">특별한 날, 특별한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {cakes.map((cake, index) => (
              <CakeCard
                key={index}
                image={cake.image}
                title={cake.title}
                status={cake.status}
                location={cake.location}
                sameDay={cake.sameDay}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CakeRecommend;
