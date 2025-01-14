'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../public/header-images/back.svg';
import AlarmIcon from '../../../public/header-images/alarm.svg';
import CakeIcon from '../../../public/images/icons/cake.svg';
import ArrowIcon from '../../../public/my-log-images/arrow-forward.svg';

import Log1 from '../../../public/my-log-images/log.jpg';
import Log2 from '../../../public/my-log-images/cake-1.svg';
import LogIcon from '../components/Icons/LogIcon';
import Header from '../components/Header';
import Title from '../components/my-log/Title';

const LogEntry = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const handleRightButtonClick = () => {
    router.push('/notice');
  };

  const handleLogButtonClick = () => {
    router.push('/log-entry/new-log');
  };

  const logData = [
    { src: Log1, title: '집들이 파티에 빠질 수 없는 케이크 가게 8곳' },
    { src: Log2, title: '고급스러운\n티아라 케이크 5곳' },
    { src: Log2, title: '혜인이의 생일 파티!!' },
    { src: Log1, title: '연말 케이크~~' },
    { src: Log1, title: '연말 케이크~~' },
  ];
  return (
    <>
      <Header
        leftButtonImage={<Image src={BackIcon} alt="Back Icon" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="케이크 로그 작성"
        rightButtonImage={[
          <Image key="Alarm" src={AlarmIcon} alt="Alarm Icon" />,
        ]}
        onRightButtonClick={[handleRightButtonClick]}
        borderBottom={true}
      />
      <main className="w-full pt-[75px] px-5">
        <section className="mt-4 ">
          <div className="bg-gray-100 rounded-[4px] p-4 flex items-center">
            <div className="flex-shrink-0 mr-1">
              <Image src={CakeIcon} alt="Example Icon" />
            </div>
            <div className="ml-4 flex flex-col justify-between w-full">
              <p className="font-bold">
                베니케이크 연남점을 최근에 방문하셨네요!
              </p>
              <div className="flex mt-1">
                <label
                  onClick={handleLogButtonClick} // 텍스트 클릭 시 버튼 동작
                  className="text-gray-700 text-sm flex items-center cursor-pointer"
                >
                  케이크로그 작성하기
                  <span className="ml-1 flex items-center justify-center">
                    <Image src={ArrowIcon} alt="Arrow Icon" />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5">
          <button
            onClick={handleLogButtonClick}
            className="w-full h-[38px] text-[14px] border border-grayscale500 rounded-[4px] flex items-center justify-center gap-2"
          >
            <LogIcon width={24} height={24} />
            로그 작성하기
          </button>
        </section>
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
      </main>
    </>
  );
};

export default LogEntry;
