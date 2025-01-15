'use client';

import Image from 'next/image';
import Title from '../my-log/Title';

import Log1 from '../../../../public/my-log-images/log.jpg';
import Log2 from '../../../../public/my-log-images/cake-1.svg';

const MyCakeLog: React.FC = () => {
  const logData = [
    { src: Log1, title: '집들이 파티에 빠질 수 없는 케이크 가게 8곳' },
    { src: Log2, title: '고급스러운\n티아라 케이크 5곳' },
    { src: Log2, title: '혜인이의 생일 파티!!' },
    { src: Log1, title: '연말 케이크~~' },
    { src: Log1, title: '연말 케이크~~' },
  ];
  return (
    <section className="mt-6">
      <Title title="나의 케이크 로그" />
      {/* 저장된 디자인 미리보기 */}
      <section className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
        {logData.map((cake, index) => (
          <div key={index} className="relative w-full h-[250px]">
            {/* 이미지 */}
            <Image
              src={cake.src}
              alt={cake.title}
              layout="fill"
              objectFit="cover"
            />

            {/* 그라데이션 배경 */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* 이미지 위에 제목 */}
            <div className="px-4 absolute bottom-0 left-0 w-full text-white pb-[12px] whitespace-pre-line z-10">
              {cake.title}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default MyCakeLog;
