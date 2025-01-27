import { useRef } from 'react';
import CakeCard from './CakeCard';
import { motion, useInView } from 'framer-motion';
import { HomeRecommend } from 'types/relatedCake';

interface ICakeRecommend {
  data: HomeRecommend;
}

const CakeRecommend = ({ data }: ICakeRecommend) => {
  const special = data.special;
  const trendy = data.trendy;
  console.log(trendy);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  console.log(ref2);
  const isInView1 = useInView(ref1, {
    once: false,
    amount: 0.1,
    margin: '0px 0px -10% 0px',
  });
  const isInView2 = useInView(ref2, {
    once: false,
    amount: 0.1,
    margin: '0px 0px -10% 0px',
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
            {special.map((cake) => (
              <CakeCard
                key={cake.shopId}
                image={cake.shopImg}
                title={cake.shopName}
                operatingHours={cake.operatingHours}
                location={cake.region}
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
          <h2 className="title-2 mb-4">지금 가장 트렌디한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {trendy.map((cake) => (
              <CakeCard
                key={cake.shopId}
                image={cake.shopImg}
                title={cake.shopName}
                operatingHours={cake.operatingHours}
                location={cake.region}
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
