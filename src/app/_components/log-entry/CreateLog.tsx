'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CakeIcon from '../../../../public/home/icons/cake.svg';
import ArrowIcon from '../../../../public/my-log-images/arrow-forward.svg';
import LogIcon from '@/app/_components/Icons/LogIcon';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CreateLog: React.FC = () => {
  const [recentShop, setRecentShop] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        console.error('인증 토큰이 없습니다.');
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/preCakelog`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.recentOrderList && data.recentOrderList.length > 0) {
            setRecentShop(data.recentOrderList[0].shopName); // 가장 최근 가게 이름 설정
          } else {
            setRecentShop(null); // 빈 배열 처리
          }
        } else {
          console.error(
            '최근 주문 내역을 가져오지 못했습니다:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  const handleLogButtonClick = () => {
    router.push('/log-entry/new-log');
  };

  const handleArrowClick = () => {
    router.push('/home'); // 홈으로 이동
  };

  return (
    <>
      {/* 최근 방문 알림 섹션 */}
      <article className="mt-4">
        <div className="bg-gray-100 rounded-[4px] p-4 flex items-center">
          <figure className="flex-shrink-0 mr-1">
            <Image src={CakeIcon} alt="베니케이크 아이콘" />
          </figure>
          <div className="ml-4 flex flex-col justify-between w-full">
            {recentShop ? (
              <>
                <p className="font-bold" role="heading" aria-level={2}>
                  {recentShop}을 최근에 방문하셨네요!
                </p>
                <div className="flex mt-1">
                  <button
                    onClick={handleLogButtonClick}
                    className="text-gray-700 text-sm flex items-center cursor-pointer"
                    aria-label="케이크 로그 작성하기"
                  >
                    케이크로그 작성하기
                    <span className="ml-1 flex items-center justify-center">
                      <Image src={ArrowIcon} alt="화살표 아이콘" />
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="font-bold" role="heading" aria-level={2}>
                  아직 주문 내역이 없어요.
                </p>
                <div className="flex mt-1">
                  <button
                    onClick={handleArrowClick}
                    className="text-gray-700 text-sm flex items-center cursor-pointer"
                    aria-label="홈으로 이동"
                  >
                    케이크 둘러보기
                    <span className="ml-1 flex items-center justify-center">
                      <Image src={ArrowIcon} alt="화살표 아이콘" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </article>

      {/* 로그 작성 버튼 섹션 */}
      <section className="mt-5">
        <button
          onClick={handleLogButtonClick}
          className="w-full h-[38px] text-[14px] border border-grayscale500 rounded-[4px] flex items-center justify-center gap-2"
          aria-label="로그 작성하기"
        >
          <LogIcon width={24} height={24} />
          로그 작성하기
        </button>
      </section>
    </>
  );
};

export default CreateLog;
