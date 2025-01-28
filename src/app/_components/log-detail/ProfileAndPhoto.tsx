import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// 프로필 사진과 작성자 정보 컴포넌트
export const ProfileInfo = ({
  username,
  createAt,
  userProfile,
}: {
  username: string;
  createAt: string;
  userProfile: string;
}) => (
  <footer className="absolute bottom-4 left-3 flex items-center gap-2 text-white">
    <Image
      width={40}
      height={40}
      src={userProfile}
      className="rounded-full"
      alt="프로필 사진"
    />
    <div>
      <p className="font-medium text-sm">{username}</p>
      <time className="text-[12px]">{createAt}</time>
    </div>
  </footer>
);

// 이미지 슬라이더 컴포넌트
export const ImageSlider = ({ images }: { images: string[] }) => (
  <Swiper spaceBetween={2} slidesPerView="auto" className="mt-5">
    {images.map((image, index) => (
      <SwiperSlide key={index} style={{ width: '167px', height: '222px' }}>
        <img
          src={image}
          alt={`추가 이미지 ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
