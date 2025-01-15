'use client';

import Header from '@/app/_components/Header';

import back from '@/../public/header-images/back.svg';
import cakeIcon from '@/../public/order/cakeIcon.svg';
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Calendar from '@/app/_components/order/Calendar';
import OrderCard from '@/app/_components/order/OrderCard';
import { orders } from '../../../../constants/mockData';

const Order: React.FC = () => {
  const { cake_id } = useParams();
  const router = useRouter();
  const [nextPage, setNextPage] = useState(false);

  const [selectedSize, setSelectedSize] = useState('미니사이즈');
  const [selectedFlavor, setSelectedFlavor] = useState('초코맛');
  const [selectedColor, setSelectedColor] = useState('화이트');
  const [message, setMessage] = useState('');
  const [letteringText, setLetteringText] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('오후');

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
  const colors = ['화이트', '핑크', '블루'];

  const onclickedBack = () => {
    router.back();
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
                      className="w-4 h-4 accent-red-500"
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
            <h2 className="text-lg font-bold mb-2">맛 선택</h2>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>
          {/* Color Selection */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">색상 선택</h2>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          {/* Message Input */}
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2">꼭 확인해주세요!</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
            />
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
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          {/* Lettering Section */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">레터링 문구</h2>
            <textarea
              value={letteringText}
              onChange={(e) => setLetteringText(e.target.value)}
              placeholder="희망문구 (영문 11자 한글 9자)"
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
            />
          </div>
          {/* Refund Policy Section */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">취소 및 환불 규정</h2>
            <textarea
              value={refundPolicy}
              onChange={(e) => setRefundPolicy(e.target.value)}
              placeholder="취소 및 환불 규정을 입력하세요"
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
            />
          </div>
          {/* Reservation Button */}
          <div className="p-4">
            <button
              className="w-full bg-black text-white py-2 rounded-md text-lg font-medium"
              onClick={() => router.push('/orderList')}
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
