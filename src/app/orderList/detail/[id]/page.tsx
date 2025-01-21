'use client';
import Header from '@/app/_components/Header';
import LoadingSpinner from '@/app/_components/Loading';
import OrderCard from '@/app/_components/order/OrderCard';
import { orders } from 'constants/mockData';
import back from '@/../public/header-images/back.svg';
import Image from 'next/image';

import { useParams, useRouter } from 'next/navigation';

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();

  const getCurrentOrder = orders.find((item) => item.id === Number(id));

  if (!getCurrentOrder) {
    return <LoadingSpinner />;
  }

  const onclickedBack = () => {
    router.back();
  };

  return (
    <div className="w-full ">
      {/* Header */}
      <Header
        leftButtonImage={<Image src={back} alt="back" />}
        centerText={'예약하기'}
        onLeftButtonClick={onclickedBack}
      />
      <OrderCard order={getCurrentOrder} detail={true} />

      {/* 주문 정보 섹션 */}
      <section className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold mb-4">주문 정보</h2>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-gray-600">주문일시 :</span>
            <span>
              {getCurrentOrder?.date}
              {getCurrentOrder?.time}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">주문번호 :</span>
            <span>{getCurrentOrder?.order_id}</span>
          </div>
        </div>
      </section>

      {/* 추가 요청사항 섹션 */}
      <section className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold mb-4">추가 요청사항</h2>
        <div className="text-base">{getCurrentOrder?.description}</div>
      </section>

      {/* 총금액 및 결제방법 섹션 */}
      <section className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-base">총금액</span>
          <span className="text-base font-bold">{getCurrentOrder?.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base">결제 방법</span>
          <span className="text-base">{getCurrentOrder?.paymentMethod}</span>
        </div>
      </section>

      {/* 주문내역 상세 버튼 */}
      <div className="p-4">
        <button className="w-full py-3 border border-gray-300 rounded-lg text-base text-center">
          주문내역 상세
        </button>
      </div>
    </div>
  );
}
