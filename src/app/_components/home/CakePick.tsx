'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';

const CakePick = () => {
  return (
    <section className="pt-8 pl-5  mb-7  h-[60%]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">CAKEWAY&apos;S PICK</h2>{' '}
        <Link href="#" className="text-sm text-[#3E3F45]">
          전체보기 &gt;
        </Link>
      </div>

      {/* 슬라이드 섹션 */}
      <section className="h-full w-full ">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={8}
          slidesPerView={1.2}
          className="w-full h-full  "
        >
          {/* 첫 번째 슬라이드 */}
          <SwiperSlide className="h-full">
            <div className="h-full bg-gradient-to-t from-[rgba(255,251,251,0)] to-[rgba(15,15,15,0.58)] bg-blend-multiply mix-blend-multiply relative w-full  object-cover">
              <img
                src="/images/cake-pick-cake1.svg"
                alt="케이크 이미지 1"
                className="w-full h-full object-cover bg-"
              />
              <div className="absolute bottom-2 left-2 text-white p-2 rounded-md">
                <p className="heading-1">연말 모임에 주문하기</p>
                <p className="heading-1">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>

          {/* 두 번째 슬라이드 */}
          <SwiperSlide>
            <div className="bg-gradient-to-b from-[rgba(255,251,251,0)] to-[rgba(15,15,15,0.58)] bg-blend-multiply mix-blend-multiply relative w-full h-auto aspect-[270/373] object-cover">
              <img
                src="/images/cake-pick-cake2.svg"
                alt="케이크 이미지 2"
                className="w-full h-full object-cover "
              />
              <div className="absolute bottom-2 left-2 text-white p-2 rounded-md">
                <p className="heading-1">연말 모임에 주문하기</p>
                <p className="heading-1">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>

          {/* 세 번째 슬라이드 */}
          <SwiperSlide>
            <div className="bg-gradient-to-b from-[rgba(255,251,251,0)] to-[rgba(15,15,15,0.58)] bg-blend-multiply mix-blend-multiply relative w-full h-auto aspect-[270/373] object-cover">
              <img
                src="/images/cake-pick-cake1.svg"
                alt="케이크 이미지 1"
                className="w-full h-full object-cover "
              />
              <div className="absolute bottom-2 left-2 text-white p-2 rounded-md">
                <p className="text-sm font-bold">연말 모임에 주문하기</p>
                <p className="text-xs">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>

          {/* 네 번째 슬라이드 */}
          <SwiperSlide>
            <div className="bg-gradient-to-b from-[rgba(255,251,251,0)] to-[rgba(15,15,15,0.58)] bg-blend-multiply mix-blend-multiply relative w-full h-auto aspect-[270/373] object-cover">
              <img
                src="/images/cake-pick-cake2.svg"
                alt="케이크 이미지 2"
                className="w-full h-full object-cover "
              />
              <div className="absolute bottom-2 left-2 text-white p-2 rounded-md">
                <p className="text-sm font-bold">가족 모임에 주문하기</p>
                <p className="text-xs">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </section>
  );
};

export default CakePick;
