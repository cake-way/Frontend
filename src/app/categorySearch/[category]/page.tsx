'use client';

import Header from '@/app/_components/Header';
import { useParams, useRouter } from 'next/navigation';
import back from '../../../../public/header-images/back.svg';
import alarm from '@/../public/header-images/alarm.svg';
import calendar from '@/../public/order/calendar.svg';
import down from '@/../public/order/arrow_down.svg';
import Image from 'next/image';
import mark from '@/../public/my-log-images/mark.svg';
import { getCategoryParam } from '../../../../constants/constants';
import { getCategoryName, getHoursMinutes } from '../../../../utils/utils';
import { useState } from 'react';
import Calendar from '@/app/_components/order/Calendar';
import useCalenderStore from '@/app/store/calendarStore';
import BottomSheet from '@/app/_components/categoryCake/BottomSheet';
import useFilteringStore from '@/app/store/filteringStore';
import { cakes } from '../../../../constants/mockData';
import MarkIcon from '@/app/_components/Icons/MarkIcon';

const CategorySearch = () => {
  const params = useParams();
  const category = params?.category as keyof typeof getCategoryParam;
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { confirmDesgin, confirmPrice, confirmReigon } = useFilteringStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('오후');

  const { setFilteringDate, setTime, setPeriod, filteringDate, Period } =
    useCalenderStore();

  const onOrder = (cake_id: number) => {
    router.push(`/cakeDetail/${cake_id}`);
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

  const onclickedBack = () => {
    router.back();
  };
  const onCickedAlarm = () => {
    router.push('/notice');
  };

  const onResult = () => {
    if (selectedDate && selectedPeriod && selectedTime) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        ...getHoursMinutes(selectedTime, selectedPeriod)
      );
      setFilteringDate(newDate);
      setTime(selectedTime);
      setPeriod(selectedPeriod);
    } else {
      alert('선택부탁드립니다');
      return;
    }

    if (setCalendarOpen) {
      setCalendarOpen(false);
    }
  };

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
          onLeftButtonClick={onclickedBack}
          onRightButtonClick={[onCickedAlarm]}
        ></Header>

        <div
          className="cursor-pointer relative bg-[#ffffff] mx-5 border-solid py-2.5 text-sm flex items-center border-b border-t border-[#E9E9E9]"
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
          <Image src={down} alt="arrow_down" className="right-1 absolute" />
        </div>
        {/* Category Tabs */}
        <div className="flex gap-2 px-5 py-3.5">
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
            className={`  text-sm  bg-grayscale100 rounded-2xl px-3 py-1 ${(confirmPrice?.max ?? confirmPrice?.min) ? 'bg-grayscale800 text-white' : 'bg-grayscale100'}`}
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
        <div className="grid grid-cols-2 gap-1.5 px-5 py-2.5 ">
          {cakes.map((cake, index) => (
            <div
              key={index}
              className=" relative cursor-pointer   overflow-hidden mb-2.5"
              onClick={() => onOrder(cake.cake_id)}
            >
              <Image
                src={cake.image}
                alt={cake.name}
                width={0}
                height={0}
                className="w-full   object-cover"
              />
              <div className="absolute top-2 right-2 p-1">
                {cake.scrap_count ? (
                  <MarkIcon />
                ) : (
                  <Image src={mark} alt="mark" />
                )}
              </div>

              <div className="pt-1.5 bottom-0 z-10 font-bold text-xs text-grayscale900">
                <h3 className="font-bold text-xs text-grayscale900">
                  {cake.name}
                </h3>
                <p className=" text-xs text-grayscale900 font-semibold">
                  {cake.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>

        {calendarOpen && (
          <div className="absolute p=4 h-[calc(100dvh-var(--bottom-nav-height))]  bg-[#ffffff] w-full">
            <Header
              leftButtonImage={<Image src={back} alt="back" />}
              centerText={'예약하기'}
              onLeftButtonClick={() => setCalendarOpen(false)}
            ></Header>
            <Calendar
              selectedPeriod={selectedPeriod}
              selectedTime={selectedTime}
              selectedDate={selectedDate}
              setSelectedTime={setSelectedTime}
              setSelectedPeriod={setSelectedPeriod}
              setSelectedDate={setSelectedDate}
            />
            {/* Footer */}
            <footer className="px-4 flex gap-3  bottom-6 absolute w-full justify-between mt-6">
              <button
                onClick={() => setCalendarOpen(false)}
                className="flex-1 p-2.5 border border-gray-300 rounded
              text-gray-700 hover:bg-gray-50 transition-colors text-xs"
              >
                닫기
              </button>
              <button
                onClick={onResult}
                className="flex-1 p-2.5 bg-black text-white rounded text-xs
              hover:bg-gray-900 transition-colors"
              >
                결과 보기
              </button>
            </footer>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySearch;
