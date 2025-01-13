'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '../components/Header';
import BackIcon from '../../../public/header-images/back.svg';
import SettingIcon from '../../../public/header-images/setting.svg';
import LogImg from '../../../public/my-log-images/cake-1.svg';

const Notice = () => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    router.back();
  };

  const NoticeData = [
    {
      MainImage: LogImg,
      title: '케이크로그',
      content:
        '@mellowy23 님의 케이크로그가 "연말 모임에 주문 제작하기 좋은 케이크 가게 10곳"에 소개 되었습니다.',
    },
    {
      MainImage: LogImg,
      title: '버니케이크 연남점',
      content: '@mellowy23 님의 케이크가 완성되었어요! 바로 픽업해 주세요 :)',
    },
    {
      MainImage: LogImg,
      title: '케이크예스플리즈',
      content: '@mellowy23 님의 케이크 픽업 일이 2일 남았어요 :)',
    },
  ];

  return (
    <main className="w-full">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="알림"
        rightButtonImage={[
          <Image key="setting" src={SettingIcon} alt="setting" />,
        ]}
      />

      <div className="mt-[75px] px-8">
        {NoticeData.map((notice, index) => (
          <div
            key={index}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            {/* 오른쪽에 이미지 */}
            <div className="mr-4">
              <Image
                src={notice.MainImage}
                alt={notice.title}
                width={70}
                height={78}
              />
            </div>

            {/* 왼쪽에 제목과 내용 */}
            <div className="max-w-[calc(100%-84px)]">
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <p className="text-sm text-ellipsis overflow-hidden line-clamp-2">
                {notice.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Notice;
