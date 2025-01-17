'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import mockLogData from 'constants/mockLogData';
import LoadingSpinner from '@/app/_components/Loading';
import ScrapIcon from '../../../../public/my-log-images/mark.svg'; // 스크랩 아이콘 컴포넌트
import ScrapIconFilled from '../../../../public/my-log-images/mark-fill.svg'; // 스크랩된 아이콘 컴포넌트
import Image from 'next/image';

interface LogData {
  cakeLogid: number;
  username: string;
  cakeShopName: string;
  cakeCategoryName: string;
  title: string;
  thumbnailImage: string;
  body: string;
  isPublic: boolean;
  imageList: string[];
}

const currentUser = 'mimizae'; // 현재 로그인된 사용자 ID

const LogDetail = () => {
  const { cakeLogid } = useParams();
  const [log, setLog] = useState<LogData | null>(null);
  const [isScraped, setIsScraped] = useState(false); // 스크랩 여부 상태

  useEffect(() => {
    if (cakeLogid) {
      const fetchLogDetail = () => {
        const data = mockLogData.find(
          (log) => log.cakeLogid === Number(cakeLogid)
        );
        setLog(data || null); // 데이터가 없으면 null로 설정
      };

      fetchLogDetail();
    }
  }, [cakeLogid]);

  if (!log) {
    return <LoadingSpinner />;
  }

  const isOwner = log.username === currentUser; // 현재 로그인된 사용자가 작성자인지 확인

  const handleScrapToggle = () => {
    setIsScraped((prev) => !prev); // 스크랩 상태 토글
  };

  return (
    <div className="max-w-3xl">
      <div className="relative mb-5">
        {/* 대표 사진 */}
        <img
          src={log.thumbnailImage}
          alt={log.title}
          className="w-full h-[420px] object-cover"
        />
        {/* 스크랩 마커 */}
        {!isOwner && (
          <button
            onClick={handleScrapToggle}
            className="absolute top-3 right-3 z-10 p-2"
          >
            {isScraped ? (
              <Image src={ScrapIconFilled} alt="스크랩 아이콘" />
            ) : (
              <Image src={ScrapIcon} alt="스크랩 아이콘" />
            )}
          </button>
        )}
        {/* 그라데이션 배경 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* 대표 사진 위의 제목 */}
        <h1 className="absolute bottom-14 left-3 text-white p-2.5 text-[24px] font-semibold">
          {log.title}
        </h1>
      </div>
      {/* 본문 내용 */}
      <div className="pl-5">
        <p className="text-lg font-[700]">{log.cakeShopName}</p>
        <p className="flex text-sm font-[500] text-gray-700 gap-2">
          <span className="font-semibold text-sm text-black">영업 중</span>
          20:30에 라스트 오더
        </p>
        {/* 이미지 슬라이더 */}
        <Swiper
          spaceBetween={2} // 이미지 간 간격
          slidesPerView="auto" // 가로 방향으로 나열
          className="mt-5"
        >
          {log.imageList.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{ width: '167px', height: '222px' }} // 고정 크기 설정
            >
              <img
                src={image}
                alt={`추가 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2 text-sm font-[500] pr-5 mb-10">{log.body}</p>
      </div>
    </div>
  );
};

export default LogDetail;
