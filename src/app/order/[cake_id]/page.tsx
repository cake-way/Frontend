'use client';

import Header from '@/app/_components/Header';

import back from '@/../public/header-images/back.svg';
import cakeIcon from '@/../public/order/cakeIcon.svg';
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Calendar from '@/app/_components/order/Calendar';
import OrderCard from '@/app/_components/order/OrderCard';
import Dropdown from '@/app/_components/order/Dropdwon';
import orderApi from '@/app/_lib/orderApi';
import { getHoursMinutes } from 'utils/utils';
import { ICakeDetail } from 'types/relatedCake';
import { useQuery } from '@tanstack/react-query';

const Order: React.FC = () => {
  const { cake_id } = useParams();
  const router = useRouter();
  const [nextPage, setNextPage] = useState(false);

  const [selectedSize, setSelectedSize] = useState('미니사이즈');
  const [selectedFlavor, setSelectedFlavor] = useState('초코맛');
  const [selectedBgColor, setSelectedBgColor] = useState<string | null>(null);
  const [letteringColor, setLetteringColor] = useState<string | null>(null);
  const [letteringText, setLetteringText] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('오후');
  const { data } = useQuery<ICakeDetail>({
    queryKey: ['cakeDetail', cake_id],
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

  const flavors = ['초코맛', '바닐라맛', '딸기맛'];

  const onclickedBack = () => {
    router.back();
  };

  const onClickedOrder = async () => {
    try {
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
          memberId: 0, //현재 user의 토큰으로 바꾸기
          cakeId: +cake_id,
          orderDate: new Date().toISOString(),
          pickupDate: newDate.toISOString(),
          size: selectedSize,
          lettering: letteringText,
          color: selectedBgColor,
          lettercolor: letteringColor,
          selectedOptionIds: [flavors.indexOf(selectedFlavor)],
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
    color: selectedBgColor,
    lettercolor: letteringColor,
  };

  return (
    <div className="   flex flex-col">
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
              {cake_id}
            </div>
          </div>
          {/* Calendar Component */}
          <div>
            <Calendar
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
              options={flavors}
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
              공지내용
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
          {/* Refund Policy Section */}
          <div className="p-4 mt-32">
            <h2 className="text-lg font-bold mb-2">취소 및 환불 규정</h2>
            <p className="rounded-md text-grayscale900 bg-[#f4f4f4] px-3 py-1.5">
              환불규정에 관해서 나타내기
            </p>
          </div>
          {/* Reservation Button */}
          <div className="p-4">
            <button
              className="w-full bg-black text-white py-2 rounded-md text-lg font-medium"
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
