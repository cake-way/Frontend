'use client';

import { useState } from 'react';
import OrderCard from '../_components/order/OrderCard';
import { orders } from 'constants/mockData';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { orderHistoryApi, orderHistoryGetCakeApi } from '../_lib/orderApi';
import { cakeSearch, OrderType } from 'types/relatedCake';
import LoadingSpinner from '../_components/Loading';

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<'준비중' | '픽업 완료'>('준비중');
  const { data: cakeOrders, isLoading } = useQuery<OrderType[]>({
    queryKey: ['cakeOrders'],
    queryFn: () => orderHistoryApi(1),
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
      return cakeNames
        ? await Promise.all(
            cakeNames.map((item) => orderHistoryGetCakeApi(item))
          )
        : [];
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleTabChange = (tab: '준비중' | '픽업 완료') => {
    setActiveTab(tab);
  };

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
            layoutId={activeTab === '준비중' ? 'active-tab' : undefined}
            className={` py-2.5 text-center text-xl font-semibold border-b-2 transition-colors ${
              activeTab === '준비중'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => handleTabChange('준비중')}
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
        {activeTab === '준비중' && (
          <div className="space-y-4">
            {(cakeOrders?.length ? cakeOrders : orders).map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                orderList={true}
                cakeSearch={cakeSearch}
              />
            ))}
          </div>
        )}

        {activeTab === '픽업 완료' && (
          <div className="text-center text-gray-500 text-sm py-10">
            픽업 완료된 주문이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
