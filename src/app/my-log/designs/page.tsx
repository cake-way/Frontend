'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/app/components/Header';

import BackIcon from '../../../../public/header-images/back.svg';
import AlarmIcon from '../../../../public/header-images/alarm.svg';
import Design1 from '../../../../public/my-log-images/design1.png';
import Design2 from '../../../../public/my-log-images/design2.jpg';

const CakeDesigns = () => {
  const router = useRouter();

  // 이미지 배열
  const images = [
    <Image key="1" src={Design2} alt="design1" width={300} height={300} />,
    <Image key="2" src={Design1} alt="design2" width={300} height={300} />,
    <Image key="3" src={Design1} alt="design1" width={300} height={300} />,
    <Image key="4" src={Design2} alt="design2" width={300} height={300} />,
    // 여기에 추가 이미지들
  ];

  return (
    <main className="mt-[105px] w-full h-screen flex flex-col items-center">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={() => {
          router.back();
        }}
        centerText="저장한 디자인"
        rightButtonImage={[<Image key="Alarm" src={AlarmIcon} alt="Alarm" />]}
        borderBottom={true}
      />

      {/* 그리드 레이아웃을 이용한 이미지 배치 */}
      <div className="grid grid-cols-2 gap-2 w-full p-4">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <div className="flex justify-center items-center">{image}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CakeDesigns;
