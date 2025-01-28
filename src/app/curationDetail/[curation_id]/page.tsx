'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import { useParams } from 'next/navigation';
import Image from 'next/image';

import { mockData } from 'constants/mock';
import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';
import LoadingSpinner from '@/app/_components/Loading';
import BackIcon from '../../../../public/header-images/back.svg';
import { Log } from 'types/curation/curation-detail';

const curationDetail = () => {
  //const { curation_id } = useParams();
  const router = useRouter();
  const [log, setLog] = useState<Log | null>(null);

  // Mock 데이터를 이용한 렌더링
  useEffect(() => {
    // 실제 API 호출 대신 mockData 사용
    const fetchMockData = async () => {
      try {
        setLog(mockData); // mockData를 상태로 설정
      } catch (error) {
        console.error('Failed to fetch mock data:', error);
      }
    };

    fetchMockData();
  }, []); // curation_id가 필요하지 않으므로 빈 배열

  if (!log) {
    return <LoadingSpinner />;
  }

  return (
    <article className="max-w-3xl mx-auto">
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

        {/* 그라데이션 배경 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* 대표 사진 위의 제목 */}
        <h1 className="absolute w-4/6 bottom-8 left-3 text-white p-2.5 text-[24px] font-semibold">
          {log.title}
        </h1>
      </section>

      <section className="flex flex-col gap-4 text-sm mt-8 px-5 font-medium">
        <span>
          연말에 친구들과 혹은 가족들과 함께 즐기기에 좋은 케이크 맛집 10곳을
          선정해 보았습니다!{' '}
        </span>
        <span> *스크랩 수가 많은 가게를 위주로 구성되었습니다.</span>
      </section>

      <div className="border-t-4 border-gray-200 my-5" />

      {/* 케이크 로그 반복 */}
      {log.curationCakelog.map((cakeLog, index) => {
        const cakeShop = cakeLog.shopDto[0]; // 첫 번째 케이크샵 데이터만 사용
        return (
          <section key={cakeLog.cakelogId} className="mb-8 px-5">
            {/* 가게 이름 및 운영 시간 */}
            <p className="text-lg font-bold">{cakeShop.shopId}</p>
            <p className="flex text-sm text-gray-600 gap-2">
              <span className="font-semibold text-sm text-black">
                운영 시간:
              </span>
              {cakeShop.operatingHour.dayOfWeek} -{' '}
              {cakeShop.operatingHour.openTime.hour}:
              {cakeShop.operatingHour.openTime.minute} ~{' '}
              {cakeShop.operatingHour.closeTime.hour}:
              {cakeShop.operatingHour.closeTime.minute}
            </p>

            {/* 이미지 슬라이더 */}
            <ImageSlider images={cakeLog.imageUrls} />

            {/* 작성자 정보 */}
            <p className="mt-1 text-center text-xs text-gray-500">
              {cakeLog.username}의 사진
            </p>

            {/* 본문 내용 */}
            <p className="mt-3 text-sm font-medium text-gray-700">
              {cakeLog.body}
            </p>

            {/* 경계선 */}
            {index < log.curationCakelog.length - 1 && (
              <div className="border-t-2 border-gray-300 my-5" />
            )}
          </section>
        );
      })}
    </article>
  );
};

export default curationDetail;
