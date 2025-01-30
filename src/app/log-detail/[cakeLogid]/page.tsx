'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import LoadingSpinner from '@/app/_components/Loading';
import { fetchLogDetail, toggleScrap } from '@/app/_lib/api/logDetail';
import { fetchScrapLogs } from '@/app/_lib/api/logScrap';
import useUserStore from '@/app/store/userInfoStore';
import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';

import ScrapIcon from '../../../../public/my-log-images/mark.svg';
import ScrapIconFilled from '../../../../public/my-log-images/mark-fill.svg';
import BackIcon from '../../../../public/header-images/back-white.svg';
import { LogData } from 'types/cake-log/log-detail';

const LogDetail = () => {
  const { cakeLogid } = useParams();
  const [log, setLog] = useState<LogData | null>(null);
  const [isScraped, setIsScraped] = useState(false);
  const user = useUserStore((state) => state.userInfo);
  const currentUser = user?.username;
  const router = useRouter();

  // 로그 상세 데이터 가져오기
  useEffect(() => {
    if (cakeLogid && !isNaN(Number(cakeLogid))) {
      const logId = Number(cakeLogid);
      const fetchLog = async () => {
        try {
          const data: LogData = await fetchLogDetail(logId);
          setLog(data);
        } catch (error) {
          console.error('로그 데이터를 가져오는 데 실패했습니다.', error);
        }
      };
      fetchLog();
    }
  }, [cakeLogid]);

  // 스크랩한 로그 리스트에 있는지 확인 후 마크 설정
  useEffect(() => {
    const checkIfScraped = async () => {
      try {
        const data = await fetchScrapLogs();
        const scrapLogIds =
          data?.map((item: { id: string }) => Number(item.id)) || [];
        if (scrapLogIds.includes(Number(cakeLogid))) {
          setIsScraped(true);
        } else {
          setIsScraped(false);
        }
      } catch (error) {
        console.error('스크랩 로그 가져오기 실패:', error);
      }
    };
    if (cakeLogid) checkIfScraped();
  }, [cakeLogid]);

  const handleScrapToggle = async () => {
    if (cakeLogid && !Array.isArray(cakeLogid)) {
      const logId = Number(cakeLogid);
      if (!isNaN(logId)) {
        try {
          const newScrapState = !isScraped;
          await toggleScrap(logId, newScrapState);
          setIsScraped(newScrapState); // 상태 변경
        } catch (error) {
          console.error('스크랩 상태 업데이트 실패:', error);
        }
      } else {
        console.error('cakeLogid가 유효하지 않습니다.');
      }
    }
  };

  const isOwner = log?.username === currentUser; // 현재 로그인된 사용자가 작성자인지 확인

  if (!log) {
    return <LoadingSpinner />; // 데이터 불러올 때
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(log.createAt); // 날짜 포맷팅

  return (
    <article className="w-full">
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] flex justify-between px-5 py-3 z-50">
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => router.back()} className="bg-transparent">
          <Image src={BackIcon} alt="뒤로 가기" />
        </button>

        {/* 스크랩 마커 (isOwner가 아닐 때만 표시) */}
        {!isOwner && (
          <button onClick={handleScrapToggle} className="bg-transparent p-2">
            <Image
              src={isScraped ? ScrapIconFilled : ScrapIcon}
              alt="스크랩 아이콘"
            />
          </button>
        )}
      </div>

      <section className="relative mb-5">
        {/* 대표 사진 */}
        <img
          src={log.thumbnailImage}
          alt={log.title}
          className="w-full h-[420px] object-cover"
        />

        {/* 그라데이션 배경 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* 대표 사진 위의 제목 */}
        <h1 className="absolute w-4/6 bottom-20 left-3 text-white p-2.5 text-[24px] font-semibold">
          {log.title}
        </h1>

        {/* 프로필 사진, 이름, 날짜 */}
        <div className="flex items-center gap-2 text-white absolute bottom-5 left-3">
          <img
            src={log.userProfile}
            alt={log.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{log.username}</p>
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
      </section>

      {/* 본문 내용 */}
      <section className="pl-5">
        <p className="text-lg font-[700]">{log.cakeShopName}</p>
        <p className="flex text-sm font-[500] text-grayscale700 gap-2">
          <span className="font-semibold text-sm text-black">영업 중</span>
          20:30에 라스트 오더
        </p>

        {/* 이미지 슬라이더 */}
        <ImageSlider images={log.imageList} />

        {/* 본문 내용 */}
        <p className="mt-3 text-sm font-[500] pr-5 mb-10">{log.body}</p>
      </section>
    </article>
  );
};

export default LogDetail;
