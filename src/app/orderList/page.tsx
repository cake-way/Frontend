'use client';

import { useState } from 'react';
import OrderCard from '../_components/order/OrderCard';
import { orders } from 'constants/mockData';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<'준비중' | '픽업 완료'>('준비중');

  const handleTabChange = (tab: '준비중' | '픽업 완료') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen ">
      {/* Tabs */}
      <div className="flex  relative border-b px-5 justify-center">
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
      </div>

      {/* Order List */}
      <div className="p-4">
        {activeTab === '준비중' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {activeTab === '픽업 완료' && (
          <div className="text-center text-gray-500 text-sm py-10">
            픽업 완료된 주문이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
