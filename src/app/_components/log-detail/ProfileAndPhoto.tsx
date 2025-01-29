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
  <Swiper
    spaceBetween={2}
    slidesPerView={images.length === 1 ? 1 : 'auto'} // 이미지 개수가 1일 경우 슬라이드 하나로 고정
    className="mt-4"
    style={{
      overflow: 'hidden', // 이미지가 한 개일 때 고정되도록 설정
    }}
  >
    {images.map((image, index) => (
      <SwiperSlide
        key={index}
        style={{
          width: images.length === 1 ? '335px' : '167px', // 이미지 개수에 따라 width 설정
          height: '222px',
          paddingRight: images.length === 1 ? '20px' : '0',
          display: 'flex', // 수평 정렬을 위해 flex 사용
          justifyContent: 'center', // 수평 정렬
        }}
      >
        <img
          src={image}
          alt={`추가 이미지 ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
