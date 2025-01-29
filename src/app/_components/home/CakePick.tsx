'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface curatrion {
  curationId: number;
  title: string;
  thumbnailImage: string;
}
interface ICakePick {
  curationList: curatrion[];
}
const CakePick = ({ curationList }: ICakePick) => {
  const router = useRouter();
  return (
    <section className="pt-5 pl-5  mb-7 h-auto  flex flex-col object-cover">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">CAKEWAY&apos;S PICK</h2>{' '}
        <Link
          href="/home/all-cakeways-picks"
          className="text-sm  pr-5 text-[#3E3F45]"
        >
          전체보기 &gt;
        </Link>
      </div>

      {/* 슬라이드 섹션 */}
      <section className=" w-full    ">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={8}
          slidesPerView={1.2}
          className="w-full cursor-pointer"
          onClick={() => router.push('/home/all-cakeways-picks')}
        >
          {/* 첫 번째 슬라이드 */}
          <SwiperSlide className="w-full">
            <div className="  relative w-full aspect-[288/373]">
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,15,0.58)] to-transparent z-10" />
              <Image
                fill
                src="/home/cake-pick-cake1.svg"
                alt="케이크 이미지 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-[#ffffff]  p-2 rounded-md z-50">
                <p className="text-xl font-semibold">연말 모임에 주문하기</p>
                <p className="text-xl font-semibold">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>

          {/* 두 번째 슬라이드 */}
          <SwiperSlide className="w-full">
            <div className="  relative w-full aspect-[288/373]">
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,15,0.58)] to-transparent z-10" />
              <Image
                fill
                src="/home/cake-pick-cake2.svg"
                alt="케이크 이미지 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-[#ffffff]  p-2 rounded-md z-50">
                <p className="text-xl font-semibold">연말 모임에 주문하기</p>
                <p className="text-xl font-semibold">좋은 케이크 가게 10곳</p>
              </div>
            </div>
          </SwiperSlide>

          {/*  슬라이드 */}
          {curationList?.map((i) => (
            <SwiperSlide className="w-full" key={i.curationId}>
              <div className="  relative w-full aspect-[288/373]">
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,15,0.58)] to-transparent z-10" />
                <Image
                  fill
                  src={i.thumbnailImage}
                  alt="케이크 이미지 1"
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute bottom-2 left-2 text-[#ffffff]  p-2 rounded-md z-50">
                  <p className="text-xl font-semibold">{i.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default CakePick;
