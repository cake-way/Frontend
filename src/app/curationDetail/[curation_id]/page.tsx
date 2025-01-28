'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../../public/header-images/back.svg';
import MarkIcon from '@/app/_components/Icons/MarkIcon';

import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';
import LoadingSpinner from '@/app/_components/Loading';

import { Log } from 'types/curation/curation-detail';
import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

const curationDetail = () => {
  const { curation_id } = useParams();
  const router = useRouter();
  const [log, setLog] = useState<Log | null>(null);

  useEffect(() => {
    const fetchCurationDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/curation/${curation_id}`,
          {
            method: 'GET',
            headers: getAuthHeaders(),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setLog(data);
      } catch (error) {
        console.error('Failed to fetch curation detail:', error);
      }
    };

    fetchCurationDetail();
  }, [curation_id]); // id가 변경될 때마다 재호출

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
        <h1 className="absolute w-4/6 bottom-10 left-3 pl-6 text-white text-[24px] font-semibold">
          {log.title}
        </h1>
      </section>

      <section className="flex flex-col gap-4 text-sm mt-9 px-5 font-medium">
        <span>
          연초에 친구들과 혹은 가족들과 함께 즐기기 좋은 케이크 맛집을 선정해
          보았습니다~!{' '}
        </span>
        <span> *스크랩 수가 많은 가게를 위주로 구성되었습니다.</span>
      </section>

      <div className="border-t-4 border-grayscale100 mt-8 mb-6" />

      {/* 케이크 로그 반복 */}
      {log.curationCakelog.map((cakeLog, index) => {
        const cakeShop = cakeLog.shopDto; // 객체로 사용

        // 시간 문자열에서 ':00' 제거
        const formatTime = (time: string) => time.slice(0, 5);

        return (
          <section key={cakeLog.cakelogId} className="mb-10 px-5">
            {/* 가게 이름 및 운영 시간 */}
            <div className="flex justify-between items-end">
              <p className="text-lg font-bold">{cakeShop.shopName}</p>
              <MarkIcon fill="black" />
            </div>
            <p className="flex text-sm text-grayscale700 gap-2">
              <span className="font-semibold text-sm text-grayscale900">
                운영 시간
              </span>
              {cakeShop.operatingHours.dayOfWeek} -{' '}
              {formatTime(cakeShop.operatingHours.openTime)} ~{' '}
              {formatTime(cakeShop.operatingHours.closeTime)}
            </p>

            {/* 이미지 슬라이더 */}
            <ImageSlider images={cakeLog.imageUrls} />

            {/* 작성자 정보 */}
            <p className="mt-1 text-center text-xs text-grayscale500">
              {cakeLog.username}의 사진
            </p>

            {/* 본문 내용 */}
            <p className="mt-3 text-sm font-medium text-black">
              {cakeLog.body}
            </p>

            {/* 경계선 */}
            {index < log.curationCakelog.length - 1 && (
              <div className="border border-grayscale400 mt-10" />
            )}
          </section>
        );
      })}
    </article>
  );
};

export default curationDetail;
