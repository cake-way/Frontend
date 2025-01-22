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
    <>
      {/* Header */}
      <Header
        leftButtonImage={<Image src={back} alt="back" />}
        centerText={'상세내역'}
        onLeftButtonClick={onclickedBack}
        borderBottom
      />
      <div className="w-full ">
        <div className="pt-9 px-5 ">
          <OrderCard order={getCurrentOrder} detail={true} />
        </div>

        {/* 주문 정보 섹션 */}
        <section className=" px-5 mt-5 mb-7 ">
          <h2 className=" font-semibold mb-[5px] ">주문 정보</h2>
          <div className="space-y-1 text-sm">
            <div className="flex gap-2 text-grayscale700 text-sm font-medium">
              <span>주문일시 :</span>
              <span>
                {getCurrentOrder?.date}
                &nbsp;
                {getCurrentOrder?.time}
              </span>
            </div>
            <div className="flex gap-2 text-grayscale700 text-sm font-medium">
              <span>주문번호 :</span>
              <span>{getCurrentOrder?.order_id}</span>
            </div>
          </div>
        </section>

        {/* 추가 요청사항 섹션 */}
        <section className="px-5  pb-7 border-grayscale100 border-b-[6px]">
          <h2 className="font-semibold mb-[5px]">추가 요청사항</h2>
          <div className=" text-grayscale700 text-sm font-medium">
            {getCurrentOrder?.description}
          </div>
        </section>

        {/* 총금액 및 결제방법 섹션 */}
        <section className=" px-5 pt-[18px] ">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base">총금액</span>
            <span className="text-base font-bold">
              {getCurrentOrder?.price}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base">결제 방법</span>
            <span className="text-base">{getCurrentOrder?.paymentMethod}</span>
          </div>
        </section>

        {/* 주문내역 삭제 버튼 */}
        <div className=" px-5 mt-11 w-full">
          <button className="w-full py-3 border border-grayscale500 text-base text-center text-primaryRed1 rounded">
            주문내역 삭제
          </button>
        </div>
      </div>
    </>
  );
}
