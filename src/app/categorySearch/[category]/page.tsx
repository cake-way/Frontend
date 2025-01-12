'use client';

import Header from '@/app/components/Header';
import { useParams, useRouter } from 'next/navigation';
import back from '../../../../public/header-images/back.svg';
import alarm from '@/../public/header-images/alarm.svg';
import calendar from '@/../public/order/calendar.svg';
import Image from 'next/image';
import { cakes, getCategoryParam } from '../../../../constants/constants';
import { getCategoryName } from '../../../../utils/utils';
import { useRef, useState } from 'react';
import Calendar from '@/app/components/order/Calendar';
import useCalenderStore from '@/app/store/calendarStore';

const CategorySearch = () => {
  const params = useParams();
  const category = params?.category as keyof typeof getCategoryParam;
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const todayRef = useRef(true);
  const { selectedDateNumber, selectedDate, selectedPeriod } =
    useCalenderStore();

  const onOrder = (cake_id: number) => {
    router.push(`/order/${cake_id}`);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  console.log(calendarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header
        leftButtonImage={<Image src={back} alt="back" />}
        centerText={getCategoryName(category) || '카테고리 없음'}
        rightButtonImage={[<Image key="Alarm" src={alarm} alt="alrm" />]}
      ></Header>

      <div
        className="border-solid  border-b border-t border-[#E9E9E9]"
        onClick={() => setCalendarOpen(true)}
      >
        <div>
          <Image src={calendar} alt="calendar"></Image>
        </div>
        {isSameDay(selectedDate, new Date()) ? <div>오늘</div> : ''}
      </div>
      {/* Category Tabs */}
      <div className="flex gap-4 p-4 bg-white">
        <button className="flex items-center gap-1">
          추천순
          <svg className="w-4 h-4" /* 드롭다운 아이콘 */ />
        </button>
        <button>지역</button>
        <button>가격</button>
        <button className="px-3 py-1 bg-gray-900 text-white rounded-full">
          디자인
        </button>
      </div>

      {/* Cake Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {cakes.map((cake, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden"
            onClick={() => onOrder(cake.cake_id)}
          >
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full aspect-square object-cover"
            />
            <button className="absolute top-2 right-2 p-1 bg-white/80 rounded-full">
              <svg className="w-5 h-5" /* 북마크 아이콘 */ />
            </button>
            <div className="p-3">
              <h3 className="font-medium">{cake.name}</h3>
              <p className="text-sm mt-1">{cake.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>

      {calendarOpen && (
        <div className="absolute p=4 h-dvh bg-[#ffffff]">
          <Header
            leftButtonImage={<Image src={back} alt="back" />}
            centerText={'예약하기'}
          ></Header>
          <Calendar setCalendarOpen={setCalendarOpen} />
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
