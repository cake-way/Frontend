'use client';

import { useEffect, useState } from 'react';
import OrderCard from '../_components/order/OrderCard';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { orderHistoryApi, orderHistoryGetCakeApi } from '../_lib/orderApi';
import { cakeSearch, OrderType } from 'types/relatedCake';
import LoadingSpinner from '../_components/Loading';
import useUserStore from '../store/userStore';
import { useRouter } from 'next/navigation';

export default function OrderList() {
  const { userInfo } = useUserStore();
  const [activeTab, setActiveTab] = useState<'주문 접수' | '픽업 완료'>(
    '주문 접수'
  );
  const router = useRouter();
  const [allowBack, setAllowBack] = useState(false);

  const { data: cakeOrders, isLoading } = useQuery<OrderType[]>({
    queryKey: ['cakeOrders', userInfo],
    queryFn: async () => {
      if (!userInfo?.memberId) return [];
      return await orderHistoryApi(+userInfo?.memberId);
    },
    enabled: !!userInfo?.memberId,
    select: (data) => {
      // NOT_FOUND인 경우 빈 배열 반환
      return 'status' in data && data.status === 'NOT_FOUND' ? [] : data;
    },
  });

  const { data: cakeSearch } = useQuery<cakeSearch[]>({
    queryKey: ['cakeSearch', cakeOrders],
    queryFn: async () => {
      const cakeNames = cakeOrders?.map((item) => item.cakeName);

      if (!cakeNames) return [];

      const results = await Promise.all(
        cakeNames.map((item) => orderHistoryGetCakeApi(item))
      );
      return results.flat();
    },
  });
  useEffect(() => {
    if (!userInfo) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }
  // 페이지 방문 시 뒤로가기 상태 설정
  useEffect(() => {
    const previousPath = document.referrer;

    if (previousPath.includes('/order/')) {
      setAllowBack(false); // 뒤로가기 비허용
    } else {
      setAllowBack(true); // 뒤로가기 허용
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleTabChange = (tab: '주문 접수' | '픽업 완료') => {
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    if (!allowBack) {
      alert('현재 화면에서 뒤로 갈 수 없습니다.');
    } else {
      router.back();
    }
  };
  const readyCake = cakeOrders?.filter((item) => item.status === '주문 접수');
  const doneCake = cakeOrders?.filter((item) => item.status === '픽업 완료');
  return (
    <>
      {/* Tabs */}
      <header className="flex sticky bg-[#ffffff] top-0 z-50 border-b px-5 justify-center">
        <Image
          src="/header-images/back.svg"
          alt="back-icon"
          width={24}
          height={24}
          className="absolute justify-start left-5 top-2.5"
          onClick={handleBackClick}
        />
        <div className="flex gap-[18px]">
          <motion.button
            layoutId={activeTab === '주문 접수' ? 'active-tab' : undefined}
            className={` py-2.5 text-center text-xl font-semibold border-b-2 transition-colors ${
              activeTab === '주문 접수'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => handleTabChange('주문 접수')}
          >
            준비중
          </motion.button>
          <motion.button
            layoutId={activeTab === '픽업 완료' ? 'active-tab' : undefined}
            className={` py-2.5 text-center text-xl font-semibold border-b-2 transition-colors ${
              activeTab === '픽업 완료'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => handleTabChange('픽업 완료')}
          >
            픽업 완료
          </motion.button>
        </div>
      </header>

      {/* Order List */}
      <div className="p-4">
        {activeTab === '주문 접수' && (
          <div className="space-y-4">
            {readyCake?.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-10">
                주문 내역이 없습니다.
              </div>
            ) : (
              <>
                {readyCake
                  ?.toSorted(
                    (a, b) =>
                      new Date(a.pickupDate).getTime() -
                      new Date(b.pickupDate).getTime()
                  )
                  .map((order) => (
                    <OrderCard
                      key={order.orderId}
                      order={order}
                      orderList={true}
                      cakeSearch={cakeSearch}
                    />
                  ))}
              </>
            )}
          </div>
        )}

        {activeTab === '픽업 완료' && (
          <div className="space-y-4">
            {doneCake?.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-10">
                픽업 완료된 주문이 없습니다.
              </div>
            ) : (
              <>
                {doneCake?.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    orderList={true}
                    cakeSearch={cakeSearch}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
