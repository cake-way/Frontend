'use client';

import { useState } from 'react';
import OrderCard from '../_components/order/OrderCard';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { orderHistoryApi, orderHistoryGetCakeApi } from '../_lib/orderApi';
import { cakeSearch, OrderType } from 'types/relatedCake';
import LoadingSpinner from '../_components/Loading';
import useUserStore from '../store/userStore';

export default function OrderList() {
  const { userInfo } = useUserStore();
  const [activeTab, setActiveTab] = useState<'주문 접수' | '픽업 완료'>(
    '주문 접수'
  );
  const { data: cakeOrders, isLoading } = useQuery<OrderType[]>({
    queryKey: ['cakeOrders', userInfo],
    queryFn: () => orderHistoryApi(+userInfo.memberId),
    enabled: !!userInfo,
    select: (data) => {
      // NOT_FOUND인 경우 빈 배열 반환
      return 'status' in data && data.status === 'NOT_FOUND' ? [] : data;
    },
  });
  console.log(cakeOrders);

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
  console.log(cakeSearch);
  //요거 수정하기
  if (!userInfo) {
    return <div>로그인해주세요</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleTabChange = (tab: '주문 접수' | '픽업 완료') => {
    setActiveTab(tab);
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
                {readyCake?.map((order) => (
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
