'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import BackIcon from '../../../../public/header-images/back-white.svg';
import MarkIcon from '@/app/_components/Icons/MarkIcon';

import { ImageSlider } from '@/app/_components/log-detail/ProfileAndPhoto';
import LoadingSpinner from '@/app/_components/Loading';

import { Log } from 'types/curation/curation-detail';
import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

const CurationDetail = () => {
  const { curation_id } = useParams();
  const router = useRouter();
  const [log, setLog] = useState<Log | null>(null);
  const [relatedCurations, setRelatedCurations] = useState<Log[]>([]);

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
        setLog(data);
      } catch (error) {
        console.error('Failed to fetch curation detail:', error);
      }
    };

    fetchCurationDetail();
  }, [curation_id]);

  useEffect(() => {
    const fetchRelatedCurations = async () => {
      try {
        // DB에 있는 curation_id 값 하드코딩 (1, 2, 3, 4)
        const allCurationIds = [1, 2, 3, 4];

        // 현재 params에서 curation_id 제외
        const currentCurationId =
          typeof curation_id === 'string' ? parseInt(curation_id) : null;
        if (currentCurationId === null) {
          throw new Error('Invalid curation_id');
        }

        const remainingIds = allCurationIds.filter(
          (id) => id !== currentCurationId
        );
        // remainingIds에서 랜덤으로 2개 선택
        const randomIds = remainingIds
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        // 랜덤으로 선택된 curation_id로 데이터 가져오기
        const relatedData = await Promise.all(
          randomIds.map((id) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/curation/${id}`, {
              method: 'GET',
              headers: getAuthHeaders(),
            }).then((res) => res.json())
          )
        );
        setRelatedCurations(relatedData);
      } catch (error) {
        console.error('Failed to fetch related curations:', error);
      }
    };

    fetchRelatedCurations();
  }, [curation_id]);

  if (!log) {
    return <LoadingSpinner />;
  }

  return (
    <article className="w-full">
      {/* 상단 고정된 헤더 영역 (뒤로 가기 버튼 + 스크랩 버튼) */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] flex items-center justify-between px-5 py-4 z-50 bg-transparent">
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => router.back()} className="flex items-center">
          <Image src={BackIcon} alt="뒤로 가기" />
        </button>

        {/* 스크랩(마크) 아이콘 */}
        <MarkIcon fill="white" />
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

        {/* 제목 및 설명 표시 */}
        <div className="absolute bottom-2 left-2 text-[#ffffff]  p-2 rounded-md z-50">
          <p className="text-2xl font-semibold max-w-[240px]  line-clamp-2">
            {log.title}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 text-sm mt-9 px-5 font-medium">
        <span>
          연초에 친구들과 혹은 가족들과 함께 즐기기 좋은 케이크 맛집을 선정해
          보았습니다~!
        </span>
        <span>*스크랩 수가 많은 가게들 위주로 구성되었습니다.</span>
      </section>

      <div className="border-t-[6px] border-grayscale100 mt-8 mb-6" />

      {/* 케이크 로그 반복 */}
      {log?.curationCakelog?.map((cakeLog, index) => {
        const cakeShop = cakeLog.shopDto;
        const formatTime = (time: string) => time.slice(0, 5); // 시간 포맷 정리

        return (
          <section
            key={cakeLog.cakelogId}
            className={`pl-5 ${index === log.curationCakelog.length - 1 ? 'mb-5' : 'mb-16'}`}
          >
            {/* 가게 이름 및 운영 시간 */}
            <div className="flex pr-5 justify-between items-end">
              <p className="text-lg font-bold">{cakeShop.shopName}</p>
              <MarkIcon fill="black" />
            </div>
            <p className="flex pr-5 text-sm text-grayscale700 gap-2">
              <span className="font-bold text-sm text-grayscale900">
                영업 시간
              </span>
              {cakeShop.operatingHours
                ? `${formatTime(cakeShop.operatingHours.openTime)}am - ${formatTime(cakeShop.operatingHours.closeTime)}pm`
                : '정보 없음'}
            </p>

            {/* 이미지 슬라이더 */}
            <ImageSlider images={cakeLog.imageUrls} />

            {/* 작성자 정보 */}
            <p className="mt-1 text-center text-xs text-grayscale500">
              {cakeLog.username}의 사진
            </p>

            {/* 본문 내용 */}
            <p className="mt-3 pr-5 text-sm font-medium text-black">
              {cakeLog.body}
            </p>

            {index === 1 && (
              <p className="my-font-class w-60 my-[68px] py-3 text-[20px] text-center border-t border-b border-grayscale400 mx-auto">
                이번에는 또 다른 <br /> 케이크를 찾아봤는데요~!
              </p>
            )}

            {/* 경계선 (마지막 아이템일 때만) */}
            {index === log.curationCakelog.length - 1 && (
              <div className="border border-grayscale400 mt-16" />
            )}
          </section>
        );
      })}

      {/* 랜덤으로 선택된 다른 curation들 표시 */}
      <section className="mt-5 px-5">
        <p className="text-lg font-bold mb-4">다른 케이크 로그 살피기</p>
        <div className="flex flex-col gap-5">
          {relatedCurations.map((relatedCuration) => (
            <div
              key={relatedCuration.curationId}
              onClick={() => {
                router.push(`/curationDetail/${relatedCuration.curationId}`);
              }}
              className="flex gap-[10px] cursor-pointer"
            >
              {/* 제목과 설명을 포함하는 div */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold">
                    {relatedCuration.title}
                  </h3>
                </div>
                <p className="mt-2 h-10 text-sm overflow-hidden text-grayscale700 line-clamp-2">
                  {relatedCuration.description}
                </p>
                <div className="flex mt-4 gap-[18px]">
                  <p className="text-[12px] text-primaryRed2 font-medium">
                    파리크로와상 외 9곳
                  </p>
                  <p className="text-[12px] text-grayscale600 font-medium">
                    2024.12.06
                  </p>
                </div>
              </div>

              {/* 대표 사진 */}
              <img
                src={relatedCuration.thumbnailImage}
                alt={relatedCuration.title}
                className="w-[105px] h-[105px] object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default CurationDetail;
