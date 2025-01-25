'use client';
import React from 'react';
import Image from 'next/image';
import Title from './Title';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/store/userStore';

const SavedLog: React.FC = () => {
  const router = useRouter();

  const handleToLogDetail = (cakeLogid: number) => {
    // cakelog_id를 URL에 포함시켜서 동적 라우팅
    router.push(`/log-detail/${cakeLogid}`);
  };

  // useUserStore에서 전역적으로 관리되는 사용자 정보 get
  const savedLog = useUserStore((state) => state.logScrap);

  // 배열의 마지막 2개 항목 가져오기
  const lastTwoLogs = savedLog.slice(-2);

  return (
    <main className="mt-[35px] px-5 flex flex-col items-center">
      <Title
        title="저장한 케이크로그"
        link="/my-log/cake-logs"
        length={savedLog.length}
      />

      {/* 조건부 렌더링: 배열이 비었을 때 메시지 표시, 아니면 디자인 미리보기 */}
      {savedLog.length === 0 ? (
        <p className="text-gray-700 text-sm my-24">
          아직 저장한 케이크 로그가 없어요
        </p>
      ) : (
        <section className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
          {lastTwoLogs.map((cake, index) => (
            <div
              key={index}
              onClick={() => handleToLogDetail(cake.logId)} // 클릭 시 cakelog_id를 넘겨줌
              className="relative w-full h-[215px] cursor-pointer"
            >
              {/* 이미지 */}
              <Image
                src={cake.logImage}
                alt={cake.title}
                layout="fill"
                objectFit="cover"
                onClick={() => handleToLogDetail(cake.logId)} // 이미지 클릭 시에도 동적 라우팅
              />

              {/* 그라데이션 배경 */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* 이미지 위에 제목 */}
              <div className="px-4 text-[12px] absolute bottom-0 left-0 w-full text-white pb-[12px] whitespace-pre-line z-10">
                {cake.title}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default SavedLog;
