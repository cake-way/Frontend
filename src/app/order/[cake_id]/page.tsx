'use client';

import Header from '@/app/_components/Header';

import back from '@/../public/header-images/back.svg';
import cakeIcon from '@/../public/order/cakeIcon.svg';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { TimeSlotCalendar } from '@/app/_components/order/Calendar';
import OrderCard from '@/app/_components/order/OrderCard';
import Dropdown from '@/app/_components/order/Dropdwon';
import orderApi, { orderOptionApi } from '@/app/_lib/orderApi';
import { getHoursMinutes } from 'utils/utils';
import {
  ICakeDetail,
  IShopDetail,
  OrderOption,
  taste,
} from 'types/relatedCake';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/_components/Loading';
import shopDetailApi from '@/app/_lib/shopApi';
import useUserStore from '@/app/store/userInfoStore';

const Order: React.FC = () => {
  const { cake_id } = useParams();
  const router = useRouter();
  const [nextPage, setNextPage] = useState(false);
  // 스크롤 위치 관리를 위한 ref
  const pageRef = useRef<HTMLDivElement>(null);
  const [flavors, setFlavors] = useState<OrderOption[]>([]);
  const [selectedSize, setSelectedSize] = useState('미니사이즈');
  const [selectedFlavor, setSelectedFlavor] = useState<taste | ''>('');
  const [selectedBgColor, setSelectedBgColor] = useState<string | null>(null);
  const [letteringColor, setLetteringColor] = useState<string | null>(null);
  const [letteringText, setLetteringText] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('오후');
  const [aiTopic, setAiTopic] = useState('');
  const [aiSituate, setAiSituate] = useState('');
  const { userInfo } = useUserStore();
  const { data, isLoading } = useQuery<ICakeDetail>({
    queryKey: ['cakeDetail', cake_id],
  });
  const shopId = data?.shopId || null;
  const { data: shopDetail } = useQuery<IShopDetail>({
    queryKey: ['shopDetail', shopId],
    queryFn: async () => {
      if (!shopId) return;
      return await shopDetailApi(+shopId);
    },
    enabled: !!shopId,
  });
  const { data: orderOpion } = useQuery<OrderOption[]>({
    queryKey: ['orderOption', shopId],
    queryFn: async () => {
      if (!cake_id) return;
      return await orderOptionApi(+cake_id);
    },
    enabled: !!cake_id,
  });

  const sizes = [
    {
      name: '미니사이즈',
      description: '영문 11자 한글 9글자',
      price: '30,000원',
    },
    {
      name: '1호 사이즈',
      description: '영문 13자 한글 9글자',
      price: '40,000원',
    },
    {
      name: '2호 사이즈',
      description: '영문 15자 한글 13글자',
      price: '50,000원',
    },
  ];

  useEffect(() => {
    if (orderOpion) {
      setFlavors(orderOpion);
    }
  }, [orderOpion]);
  useEffect(() => {
    setSelectedFlavor(flavors[0]?.taste);
  }, [flavors]);

  useEffect(() => {
    console.log(nextPage);
    // nextPage가 변경될 때 스크롤을 맨 위로 이동
    if (nextPage && pageRef.current) {
      pageRef.current.scrollTo(0, 10000);
    }
  }, [nextPage]);

  const onclickedBack = () => {
    router.back();
  };

  const onClickedOrder = async () => {
    try {
      if (!userInfo?.memberId) {
        alert('로그인이 필요합니다.');
        return;
      }
      if (
        cake_id &&
        selectedDate &&
        selectedTime &&
        selectedPeriod &&
        selectedSize &&
        selectedFlavor &&
        selectedBgColor &&
        letteringText &&
        letteringColor
      ) {
        const newDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          ...getHoursMinutes(selectedTime, selectedPeriod)
        );

        // const pickupDate = dayjs(newDate).format('YYYY-MM-DDTHH:MM');
        const body = {
          memberId: userInfo?.memberId, //현재 user의 토큰으로 바꾸기
          cakeId: +cake_id,
          orderDate: new Date().toISOString(),
          pickupDate: newDate.toISOString(),
          size: selectedSize,
          lettering: letteringText,
          color: selectedBgColor,
          lettercolor: letteringColor,
          selectedOptionIds: [
            flavors.find((option) => option.taste === selectedFlavor)
              ?.optionId || 0,
          ],
        };
        console.log(body);
        await orderApi(body);

        alert('주문이 완료되었습니다.');
        router.push('/orderList');
      } else {
        alert('주문서를 모두 작성해주세요');
        return;
      }
    } catch (e) {
      console.error('주문 실패:', e);
    }
  };

  const order = {
    orderId: Date.now(),
    cakeName: data?.cakeName || '',
    orderDate: new Date().toISOString().toString(),
    pickupDate: new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      ...getHoursMinutes(selectedTime ?? '00:00', selectedPeriod)
    )
      .toISOString()
      .toString(),
    totalPrice: data?.price || 0,
    status: 'string',
    size: selectedSize,
    lettering: letteringText || '',
    imageUrl: data?.imageUrl || '',
    shopName: data?.shopName,
    color: selectedBgColor || '',
    lettercolor: letteringColor || '',
    selectedTastes: [selectedFlavor],
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col" ref={pageRef}>
      {!nextPage ? (
        <>
          {/* Header */}
          <Header
            leftButtonImage={<Image src={back} alt="back" />}
            centerText={'예약하기'}
            onLeftButtonClick={onclickedBack}
          />
          {/* Cake Info */}
          <div className=" relative bg-[#ffffff] mx-5 border-solid py-2.5 text-sm flex items-center border-b border-t border-[#E9E9E9]">
            <Image src={cakeIcon} alt="cakeIcon" />
            <div className="ml-2.5 px-2 font-medium text-gray-700">
              {data?.cakeName}
            </div>
          </div>
          {/* Calendar Component */}
          <div>
            <TimeSlotCalendar
              cakeShopId={data?.shopId}
              selectedDate={selectedDate}
              selectedPeriod={selectedPeriod}
              selectedTime={selectedTime}
              setSelectedDate={setSelectedDate}
              setSelectedPeriod={setSelectedPeriod}
              setSelectedTime={setSelectedTime}
            />
          </div>
          {/* Size Selection */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">사이즈</h2>
            <div className="space-y-4">
              {sizes.map((size) => (
                <label
                  key={size.name}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="size"
                      value={size.name}
                      checked={selectedSize === size.name}
                      onChange={() => setSelectedSize(size.name)}
                      className="w-4 h-4 accent-[#fa2840]"
                    />
                    <div>
                      <p className="font-medium">{size.name}</p>
                      <p className="text-sm text-gray-500">
                        {size.description}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">{size.price}</p>
                </label>
              ))}
            </div>
          </div>
          {/* Flavor Selection */}
          <div className="p-5">
            <Dropdown
              options={flavors.map((i) => i.taste)}
              selectedValue={selectedFlavor}
              onChange={(option) => setSelectedFlavor(option)}
              label="맛 선택"
            />
          </div>
          {/* 배경색상 Selection */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">배경 색상</h2>
            <input
              value={selectedBgColor ?? ''}
              type="text"
              aria-label="background-color"
              className="bg-[#f4f4f4]  text-sm font-medium text-grayscale900  w-full px-3 py-1.5 focus:outline-none rounded-md"
              onChange={(e) => setSelectedBgColor(e.target.value)}
            />
          </div>
          {/* 레터링색상 Selection */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">레터링 색상</h2>
            <input
              value={letteringColor ?? ''}
              type="text"
              aria-label="background-color"
              className="bg-[#f4f4f4]  text-sm font-medium text-grayscale900 w-full px-3 py-1.5 focus:outline-none rounded-md"
              onChange={(e) => setLetteringColor(e.target.value)}
            />
          </div>
          {/* Message Input */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">꼭 확인해주세요!</h2>
            <p className="rounded-md text-grayscale900 bg-[#f4f4f4] px-3 py-1.5">
              {shopDetail?.notice}
            </p>
          </div>
          {/* Next Button */}
          <div className="p-5">
            <button
              className="w-full bg-black text-white py-2 rounded-md text-lg font-medium"
              onClick={() => setNextPage(true)}
            >
              다음
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <Header
            leftButtonImage={<Image src={back} alt="back" />}
            centerText={'예약하기'}
            onLeftButtonClick={() => setNextPage(false)}
          />
          {/* OrderCard */}
          <div className="p-4">
            <OrderCard key={order.orderId} order={order} />
          </div>
          {/* Lettering Section */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">레터링 문구</h2>
            <textarea
              value={letteringText ?? ''}
              onChange={(e) => setLetteringText(e.target.value)}
              placeholder="희망문구 (영문 11자 한글 9자)"
              className="bg-[#f4f4f4]  resize-none text-sm font-medium text-grayscale900  w-full px-3.5 py-3.5 focus:outline-none rounded-md h-40"
            />
          </div>
          {/* Suggested Lettering Section */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-1">추천 레터링 문구</h2>
            <p className="text-gray-600 text-sm mb-4">
              (입력한 주제와 상황을 바탕으로 AI가 레터링 문구를 추천해드립니다.)
            </p>

            {/* 주제 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">주제</label>
              <input
                type="text"
                placeholder="예: 생일, 결혼기념일, 졸업"
                className="bg-[#f4f4f4] w-full px-3 py-2 rounded-md text-sm text-gray-800 focus:outline-none"
                value={aiTopic ?? ''}
                onChange={(e) => setAiTopic(e.target.value)}
              />
            </div>

            {/* 상황 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                케이크 선물 상황
              </label>
              <input
                type="text"
                placeholder="예: 가장 친한 친구의 생일파티, 부모님 결혼기념일"
                className="bg-[#f4f4f4] w-full px-3 py-2 rounded-md text-sm text-gray-800 focus:outline-none"
                value={aiSituate ?? ''}
                onChange={(e) => setAiSituate(e.target.value)}
              />
            </div>

            {/* 문구 추천 버튼 */}
            <button
              className="bg-[#000000] text-white py-2 px-4 rounded-md hover:bg-[#545454] transition"
              onClick={async () => {
                try {
                  const response = await fetch('/api/generateLettering', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      topic: aiTopic,
                      situation: aiSituate,
                    }),
                  });

                  const { suggestion } = await response.json();
                  setLetteringText(suggestion);
                } catch (error) {
                  console.error('문구 추천 실패:', error);
                  alert('문구를 추천할 수 없습니다. 다시 시도해주세요.');
                }
              }}
            >
              문구 추천 받기
            </button>
          </div>

          {/* Refund Policy Section */}
          <div className="p-4 ">
            <h2 className="text-lg font-bold mb-2">취소 및 환불 규정</h2>
            <p className="rounded-md text-grayscale900 bg-[#f4f4f4] px-3 py-1.5">
              {shopDetail?.cautions}
            </p>
          </div>
          {/* Reservation Button */}
          <div className="p-4">
            <button
              className="w-full bg-black hover:bg-[#545454]  text-white py-2 rounded-md text-lg font-medium"
              onClick={onClickedOrder}
            >
              예약하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
