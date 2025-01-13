'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/components/Header';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import Design1 from '../../../../public/my-log-images/cake-1.svg';
import Design2 from '../../../../public/my-log-images/cake-2.svg';
import Design3 from '../../../../public/my-log-images/cake-3.svg';
import MarkIcon from '@/app/components/Icons/MarkIcon';

const CakeDesigns = () => {
  const router = useRouter();

  const handleAlarmIconClick = () => {
    router.push('/notice');
  };
  // 이미지 배열
  const images = [Design1, Design2, Design3, Design1];

  return (
    <main className="mt-[105px] h-screen flex flex-col items-center">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 디자인"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        onRightButtonClick={[handleAlarmIconClick]}
        borderBottom={true}
      />

      {/* 그리드 레이아웃을 이용한 이미지 배치 */}
      <div className="grid grid-cols-2 gap-2 w-full p-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] overflow-hidden bg-gray-200" // 직사각형 크기 설정
          >
            <Image
              src={image}
              alt={`design-${index + 1}`}
              fill
              style={{ objectFit: 'cover' }} // 이미지를 꽉 채우도록 설정
            />

            {/* 마크 표시: 이미지의 우측 상단에 배치 */}
            <div className="absolute top-2 right-2">
              <MarkIcon />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CakeDesigns;
