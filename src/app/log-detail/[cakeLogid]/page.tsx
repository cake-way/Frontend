'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import LoadingSpinner from '@/app/_components/Loading';
import ScrapIcon from '../../../../public/my-log-images/mark.svg';
import ScrapIconFilled from '../../../../public/my-log-images/mark-fill.svg';
import BackIcon from '../../../../public/header-images/back.svg';
import Image from 'next/image';
import { fetchLogDetail } from '@/app/_lib/api/logDetail';

interface LogData {
  cakeLogid: number;
  username: string;
  userProfile: string;
  createAt: string;
  cakeShopId: number;
  cakeShopName: string;
  cakeCategoryName: string;
  title: string;
  thumbnailImage: string;
  body: string;
  isPublic: boolean;
  imageList: string[];
}

interface LogResponse {
  latestOrderShop: string;
  cakelogs: LogData[];
}

const currentUser = 'mimizae'; // 현재 로그인된 사용자 ID

// 스크랩 아이콘 버튼 컴포넌트
const ScrapButton = ({
  isScraped,
  onToggle,
}: {
  isScraped: boolean;
  onToggle: () => void;
}) => (
  <button onClick={onToggle} className="absolute top-3 right-3 z-10 p-2">
    <Image src={isScraped ? ScrapIconFilled : ScrapIcon} alt="스크랩 아이콘" />
  </button>
);

// 뒤로 가기 버튼 컴포넌트
const BackButton = () => (
  <div className="absolute top-3 left-3 z-10">
    <Image src={BackIcon} alt="뒤로 가기" />
  </div>
);

// 프로필 사진과 작성자 정보 컴포넌트
const ProfileInfo = ({
  username,
  createAt,
}: {
  username: string;
  createAt: string;
}) => (
  <footer className="absolute bottom-4 left-3 flex items-center gap-2 text-white">
    <Image
      width={40}
      height={40}
      src="/my-log-images/profile-photo.svg"
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
const ImageSlider = ({ images }: { images: string[] }) => (
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

const LogDetail = () => {
  const { cakeLogid } = useParams();
  const [log, setLog] = useState<LogData | null>(null);
  const [isScraped, setIsScraped] = useState(false); // 스크랩 여부 상태

  useEffect(() => {
    if (cakeLogid && typeof cakeLogid === 'string') {
      // cakeLogid가 string인 경우에만 처리
      const fetchLog = async () => {
        try {
          const data: LogResponse = await fetchLogDetail(cakeLogid); // API 호출

          // cakelogs 배열에서 해당 cakeLogid에 맞는 데이터 찾기
          const logData = data.cakelogs.find(
            (log) => log.cakeLogid === Number(cakeLogid)
          );

          setLog(logData || null); // 데이터가 없으면 null로 설정
        } catch (error) {
          console.log(error);
          console.error('로그 데이터를 가져오는 데 실패했습니다.');
        }
      };

      fetchLog();
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
        {/* 뒤로 가기 버튼 */}
        <BackButton />

        {/* 대표 사진 */}
        <img
          src={log.thumbnailImage}
          alt={log.title}
          className="w-full h-[420px] object-cover"
        />

        {/* 스크랩 마커 */}
        {!isOwner && (
          <ScrapButton isScraped={isScraped} onToggle={handleScrapToggle} />
        )}

        {/* 그라데이션 배경 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* 대표 사진 위의 제목 */}
        <h1 className="absolute w-4/6 bottom-20 left-3 text-white p-2.5 text-[24px] font-semibold">
          {log.title}
        </h1>

        {/* 프로필 사진, 이름, 날짜 */}
        <ProfileInfo username={log.username} createAt={log.createAt} />
      </div>

      {/* 본문 내용 */}
      <div className="pl-5">
        <p className="text-lg font-[700]">{log.cakeShopName}</p>
        <p className="flex text-sm font-[500] text-gray-700 gap-2">
          <span className="font-semibold text-sm text-black">영업 중</span>
          20:30에 라스트 오더
        </p>

        {/* 이미지 슬라이더 */}
        <ImageSlider images={log.imageList} />

        {/* 본문 내용 */}
        <p className="mt-2 text-sm font-[500] pr-5 mb-10">{log.body}</p>
      </div>
    </div>
  );
};

export default LogDetail;
