'use client';

import { useState } from 'react';
import OrderCard from '../_components/order/OrderCard';

const orders = [
  {
    id: 1,
    image: '/path/to/cake1.jpg',
    store: '씨에이크 성수점',
    description: '고양이 케이크 미니 · 초코',
    date: '12.05 (목)',
    time: '오후 5:00',
    price: '30,000원',
    dDay: 'D-3',
  },
  {
    id: 2,
    image: '/path/to/cake2.jpg',
    store: '베니케이크 연남점',
    description: '범스데이 케이크 미니 · 딸기',
    date: '12.05 (목)',
    time: '오후 5:00',
    price: '30,000원',
    dDay: 'D-8',
  },
];

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<'준비중' | '픽업 완료'>('준비중');

  const handleTabChange = (tab: '준비중' | '픽업 완료') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white py-4 px-5 shadow">
        <div className="flex items-center gap-4">
          <button onClick={() => history.back()} className="text-gray-700">
            &lt;
          </button>
          <h1 className="text-lg font-bold">주문 상태</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b">
        <button
          className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
            activeTab === '준비중'
              ? 'border-black text-black'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => handleTabChange('준비중')}
        >
          준비중
        </button>
        <button
          className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
            activeTab === '픽업 완료'
              ? 'border-black text-black'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => handleTabChange('픽업 완료')}
        >
          픽업 완료
        </button>
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
