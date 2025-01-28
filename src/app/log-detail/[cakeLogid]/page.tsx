'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingSpinner from '@/app/_components/Loading';
import { fetchLogDetail, toggleScrap } from '@/app/_lib/api/logDetail';
import useUserStore from '@/app/store/userInfoStore';
import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';
import LogHeader from '@/app/_components/log-detail/LogHeader';
import { LogData } from 'types/cake-log/log-detail';

const LogDetail = () => {
  const { cakeLogid } = useParams();
  const [log, setLog] = useState<LogData | null>(null);
  const [isScraped, setIsScraped] = useState(false); // 스크랩 여부 상태

  const user = useUserStore((state) => state.userInfo);

  const currentUser = user?.username;

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

  const handleScrapToggle = async () => {
    if (cakeLogid && !Array.isArray(cakeLogid)) {
      const logId = Number(cakeLogid);
      if (!isNaN(logId)) {
        try {
          console.log('현재 스크랩 상태:', isScraped); // 디버깅
          await toggleScrap(logId, isScraped); // 반전된 상태 전달
          setIsScraped((prev) => !prev); // 상태 반전
        } catch (error) {
          console.error('스크랩 상태 업데이트 실패:', error);
        }
      } else {
        console.error('cakeLogid가 유효하지 않습니다.');
      }
    }
  };

  if (!log) {
    return <LoadingSpinner />; // 로딩 중일 때
  }

  const isOwner = log.username === currentUser; // 현재 로그인된 사용자가 작성자인지 확인

  return (
    <article className="max-w-3xl">
      <LogHeader
        log={log}
        logId={cakeLogid as string}
        isOwner={isOwner}
        setScrapState={setIsScraped} // 상태 변경 함수 전달
        handleScrapToggle={handleScrapToggle}
      />

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
