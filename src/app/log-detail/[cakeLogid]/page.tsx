'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingSpinner from '@/app/_components/Loading';
import { fetchLogDetail, toggleScrap } from '@/app/_lib/api/logDetail';
import useUserStore from '@/app/store/userInfoStore';
import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';
import LogHeader from '@/app/_components/log-detail/LogHeader';

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
  isScraped: boolean;
}

const LogDetail = () => {
  const { cakeLogid } = useParams();
  const [log, setLog] = useState<LogData | null>(null);
  const [isScraped, setIsScraped] = useState(false); // 스크랩 여부 상태

  const user = useUserStore((state) => state.userInfo);

  const currentUser = user?.username;

  useEffect(() => {
    if (cakeLogid && !isNaN(Number(cakeLogid))) {
      const logId = Number(cakeLogid); // cakeLogid를 number로 변환
      const fetchLog = async () => {
        try {
          const data: LogData = await fetchLogDetail(logId); // API 호출
          console.log('API Response:', data); // 응답 확인

          if (data) {
            setLog(data); // 데이터를 직접 setLog로 설정
            setIsScraped(data.isScraped); // 스크랩 상태 설정
          } else {
            console.error('No logs found.');
            setLog(null); // 데이터가 없으면 null로 설정
          }
        } catch (error) {
          console.error('로그 데이터를 가져오는 데 실패했습니다.', error);
        }
      };

      fetchLog();
    }
  }, [cakeLogid]);

  const handleScrapToggle = async () => {
    if (cakeLogid && !Array.isArray(cakeLogid)) {
      const logId = Number(cakeLogid); // cakeLogid를 number로 변환
      if (!isNaN(logId)) {
        try {
          await toggleScrap(logId, isScraped); // 변환된 logId를 전달
          setIsScraped((prev) => !prev); // 로컬 상태 업데이트
        } catch (error) {
          console.error('스크랩 상태 업데이트 실패', error);
        }
      } else {
        console.error('Invalid cakeLogid');
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
        isScraped={isScraped}
        isOwner={isOwner}
        handleScrapToggle={handleScrapToggle}
      />

      {/* 본문 내용 */}
      <section className="pl-5">
        <p className="text-lg font-[700]">{log.cakeShopName}</p>
        <p className="flex text-sm font-[500] text-gray-700 gap-2">
          <span className="font-semibold text-sm text-black">영업 중</span>
          20:30에 라스트 오더
        </p>

        {/* 이미지 슬라이더 */}
        <ImageSlider images={log.imageList} />

        {/* 본문 내용 */}
        <p className="mt-2 text-sm font-[500] pr-5 mb-10">{log.body}</p>
      </section>
    </article>
  );
};

export default LogDetail;
