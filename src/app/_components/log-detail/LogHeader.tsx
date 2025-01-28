import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrapIcon from '../../../../public/my-log-images/mark.svg';
import ScrapIconFilled from '../../../../public/my-log-images/mark-fill.svg';
import BackIcon from '../../../../public/header-images/back-white.svg';
import { useRouter } from 'next/navigation';
import { ProfileInfo } from './ProfileAndPhoto';
import { fetchScrapLogs } from '@/app/_lib/api/logScrap';

interface LogHeaderProps {
  log: {
    title: string;
    thumbnailImage: string;
    username: string;
    userProfile: string;
    createAt: string;
  };
  logId: string;
  isOwner: boolean;
  handleScrapToggle: () => void;
  setScrapState: (value: boolean) => void;
}

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

const LogHeader = ({
  log,
  logId,
  isOwner,
  handleScrapToggle,
  setScrapState,
}: LogHeaderProps) => {
  const router = useRouter();
  const [isScraped, setIsScraped] = useState(false);
  useEffect(() => {
    const checkIfScraped = async () => {
      try {
        const data = await fetchScrapLogs();
        console.log('Fetched data:', data); // 데이터 구조 확인
        const scrapLogIds =
          data?.map((item: { id: string }) => Number(item.id)) || []; // 숫자형으로 변환
        console.log('Scrap Log IDs:', scrapLogIds); // id 배열 확인
        if (scrapLogIds.includes(Number(logId))) {
          // logId도 숫자로 변환
          setIsScraped(true); // logId가 포함되면 스크랩된 상태로 설정
        } else {
          setIsScraped(false); // 포함되지 않으면 스크랩 상태 해제
        }
      } catch (error) {
        console.error('스크랩 로그 가져오기 실패:', error);
      }
    };

    checkIfScraped();
  }, [logId]); // logId가 변경될 때마다 다시 실행

  const handleScrapToggleLocal = async () => {
    try {
      await handleScrapToggle(); // 외부에서 전달받은 토글 핸들러 실행
      setScrapState(isScraped);
    } catch (error) {
      console.error('스크랩 상태 업데이트 실패:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(log.createAt); // 날짜 포맷팅

  return (
    <section className="relative mb-5">
      {/* 뒤로 가기 버튼 */}
      <button
        onClick={() => {
          router.back();
        }}
        className="absolute top-5 left-5 z-10"
      >
        <Image src={BackIcon} alt="뒤로 가기" />
      </button>

      {/* 대표 사진 */}
      <img
        src={log.thumbnailImage}
        alt={log.title}
        className="w-full h-[420px] object-cover"
      />

      {/* 스크랩 마커 */}
      {!isOwner && (
        <ScrapButton
          isScraped={isScraped}
          onToggle={handleScrapToggleLocal} // 로컬에서 스크랩 상태를 토글
        />
      )}

      {/* 그라데이션 배경 */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* 대표 사진 위의 제목 */}
      <h1 className="absolute w-4/6 bottom-20 left-3 text-white p-2.5 text-[24px] font-semibold">
        {log.title}
      </h1>

      {/* 프로필 사진, 이름, 날짜 */}
      <ProfileInfo
        username={log.username}
        userProfile={log.userProfile}
        createAt={formattedDate}
      />
    </section>
  );
};

export default LogHeader;
