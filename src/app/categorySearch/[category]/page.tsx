'use client';

import Header from '@/app/components/Header';
import { useParams, useRouter } from 'next/navigation';
import back from '../../../../public/header-images/back.svg';
import alarm from '@/../public/header-images/alarm.svg';
import calendar from '@/../public/order/calendar.svg';
import down from '@/../public/order/arrow_down.svg';
import Image from 'next/image';
import { cakes, getCategoryParam } from '../../../../constants/constants';
import { getCategoryName } from '../../../../utils/utils';
import { useState } from 'react';
import Calendar from '@/app/components/order/Calendar';
import useCalenderStore from '@/app/store/calendarStore';
import BottomSheet from '@/app/components/categoryCake/BottomSheet';
import useFilteringStore from '@/app/store/filteringStore';

const CategorySearch = () => {
  const params = useParams();
  const category = params?.category as keyof typeof getCategoryParam;
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { filteringDate, Period } = useCalenderStore();
  const [filterName, setFilterName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { confirmDesgin, confirmPrice, confirmReigon } = useFilteringStore();

  const onOrder = (cake_id: number) => {
    router.push(`/order/${cake_id}`);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    if (date1) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
  };

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const filteredDate = filteringDate || new Date();

  const onClickedFilterButton = (name: string) => {
    setFilterName(name);
    setIsOpen(true);
  };

  console.log(confirmDesgin, confirmPrice, confirmReigon);
  return (
    <>
      {isOpen && (
        <BottomSheet
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          initName={filterName}
        />
      )}
      <div className="flex flex-col min-h-screen">
        {/* Header */}

        <Header
          leftButtonImage={<Image src={back} alt="back" />}
          centerText={getCategoryName(category) || '카테고리 없음'}
          rightButtonImage={[<Image key="Alarm" src={alarm} alt="alrm" />]}
        ></Header>

        <div
          className=" bg-[#ffffff] mx-5 border-solid py-2.5 text-sm flex items-center border-b border-t border-[#E9E9E9]"
          onClick={() => setCalendarOpen(true)}
        >
          <div className="mr-0.5">
            <Image src={calendar} alt="calendar"></Image>
          </div>
          <div className="mr-2.5 px-2 border-r-[1px] border-[#E9E9E9]">
            {isSameDay(filteredDate, new Date()) ? '오늘' : ''}&nbsp;
            {`(${days[filteredDate.getDay()]})`}
          </div>
          <div>
            {Period}
            {filteredDate.toLocaleString() === new Date().toLocaleString()
              ? ''
              : `${filteredDate.getHours()}:${filteredDate.getMinutes() === 0 ? '00' : filteredDate.getMinutes()}`}
          </div>
        </div>
        {/* Category Tabs */}
        <div className="flex gap-2 p-4">
          <button className="flex items-center gap-2 text-sm  bg-grayscale100 rounded-2xl px-3 py-1">
            추천순
            <Image src={down} alt="arrow_down" />
          </button>
          <button
            className={`text-sm  rounded-2xl px-3 py-1 ${confirmReigon && confirmReigon?.length !== 0 ? 'bg-grayscale800 text-white' : 'bg-grayscale100'}`}
            onClick={() => onClickedFilterButton('지역')}
          >
            지역
          </button>
          <button
            className={`  text-sm  bg-grayscale100 rounded-2xl px-3 py-1 ${confirmPrice ? 'bg-grayscale800 text-white' : 'bg-grayscale100'}`}
            onClick={() => onClickedFilterButton('가격')}
          >
            가격
          </button>
          <button
            className={`  text-sm  bg-grayscale100 rounded-2xl px-3 py-1 ${confirmDesgin && confirmDesgin?.length !== 0 ? 'bg-grayscale800 text-white' : 'bg-grayscale100'}`}
            onClick={() => onClickedFilterButton('디자인')}
          >
            디자인
          </button>
        </div>

        {/* Cake Grid */}
        <div className="grid grid-cols-2 gap-4 p-5">
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
                아이콘
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
    </>
  );
};

export default CategorySearch;
