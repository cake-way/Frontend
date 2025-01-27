'use client';
import Header from '@/app/_components/Header';
import LoadingSpinner from '@/app/_components/Loading';
import OrderCard from '@/app/_components/order/OrderCard';
import back from '@/../public/header-images/back.svg';
import Image from 'next/image';

import { useParams, useRouter } from 'next/navigation';
import {
  orderHistoryDetailApi,
  orderHistoryGetCakeApi,
} from '@/app/_lib/orderApi';
import { useQuery } from '@tanstack/react-query';
import { cakeSearch, OrderhistoryDetail } from 'types/relatedCake';

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();

  if (!id || Array.isArray(id)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">존재하지 않는 케이크입니다.</h1>
        <button
          className="mt-4 p-2 bg-black text-white rounded"
          onClick={() => router.push('/home')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const { data: orderDetail, isLoading } = useQuery<OrderhistoryDetail>({
    queryKey: ['orderDetail', id],
    queryFn: () => orderHistoryDetailApi(1, +id),
  });
  const { data: cakeSearch } = useQuery<cakeSearch[]>({
    queryKey: ['cakeSearch', orderDetail],
    queryFn: () => orderHistoryGetCakeApi(orderDetail?.cakeName),
    enabled: !!orderDetail,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onclickedBack = () => {
    router.back();
  };

  return (
    <>
      {orderDetail ? (
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
              <OrderCard
                order={orderDetail}
                detail={true}
                cakeSearch={cakeSearch}
              />
            </div>

            {/* 주문 정보 섹션 */}
            <section className=" px-5 mt-5 mb-7 ">
              <h2 className=" font-semibold mb-[5px] ">주문 정보</h2>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2 text-grayscale700 text-sm font-medium">
                  <span>주문일시 :</span>
                  <span>
                    {new Date(orderDetail.orderDate).getFullYear()}년&nbsp;
                    {new Date(orderDetail.orderDate).getMonth() + 1}월&nbsp;
                    {new Date(orderDetail.orderDate).getDate()}일&nbsp;
                    {new Date(orderDetail.orderDate).getHours() <= 11
                      ? '오전'
                      : '오후'}
                    &nbsp;
                    {new Date(orderDetail.orderDate).getHours()}:
                    {new Date(orderDetail.orderDate).getMinutes()}
                  </span>
                </div>
                <div className="flex gap-2 text-grayscale700 text-sm font-medium">
                  <span>주문번호 :</span>
                  <span>{orderDetail?.orderId}</span>
                </div>
              </div>
            </section>

            {/* 추가 요청사항 섹션 */}
            <section className="px-5  pb-7 border-grayscale100 border-b-[6px]">
              <h2 className="font-semibold mb-[5px]">추가 요청사항</h2>
              <div className=" text-grayscale700 text-sm font-medium">
                {orderDetail?.lettering}
              </div>
            </section>

            {/* 총금액 및 결제방법 섹션 */}
            <section className=" px-5 pt-[18px] ">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base">총금액</span>
                <span className="text-base font-bold">
                  {orderDetail?.totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">결제 방법</span>
                <span className="text-base">
                  {orderDetail?.paymentMethod ?? ''}
                </span>
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
      ) : (
        <p className="text-center text-gray-500">
          주문 정보를 불러오지 못했습니다.
        </p>
      )}
    </>
  );
}
