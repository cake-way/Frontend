'use client';

import Header from '@/app/_components/Header';
import { useParams, useRouter } from 'next/navigation';
import back from '../../../../public/header-images/back.svg';
import alarm from '@/../public/header-images/alarm.svg';
import calendar from '@/../public/order/calendar.svg';
import down from '@/../public/order/arrow_down.svg';
import Image from 'next/image';
import mark from '@/../public/my-log-images/mark.svg';
import { getCategoryName, getHoursMinutes } from '../../../../utils/utils';
import { useEffect, useRef, useState } from 'react';
import Calendar from '@/app/_components/order/Calendar';
import useCalenderStore from '@/app/store/calendarStore';
import BottomSheet from '@/app/_components/categoryCake/BottomSheet';

import cakeCategorySearchApi from '@/app/_lib/cakeCategorySearchApi';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/_components/Loading';
import { ICategoryData, priceObject } from 'types/relatedCake';
import { days } from 'constants/constants';
import { scrapCake } from '@/app/_lib/api/searchResults';
import FilledMarkIcon from '@/app/_components/Icons/FilledMarkIcon';
import { getCakeDesigns, toggleMark } from '@/app/_lib/api/cakeDesigns';

interface CakeScrap {
  id: number;
}
//카테고리 없는 ui
const CategorySearch = () => {
  const { category } = useParams();
  const router = useRouter();
  const [sortedCakeData, setSortedCakeData] = useState<ICategoryData[] | null>(
    null
  );

  // 유효한 카테고리인지 확인하는 함수
  const isValidCategory = (cat: string | string[] | undefined) => {
    const validCategories = [
      'birthday',
      'graduation',
      'dating',
      'party',
      'yearend',
      'anniversary',
      'thanks',
      'wedding',
      'work',
      'today',
    ];
    if (typeof cat === 'string') {
      return validCategories.includes(cat);
    }
    return false;
  };
  if (!category || Array.isArray(category) || !isValidCategory(category)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">유효하지 않은 카테고리입니다</h1>
        <button
          className="mt-4 p-2 bg-black text-white rounded"
          onClick={() => router.push('/home')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }
  const filter = ['추천순'];
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDesgin, setConfirmDesgin] = useState<string[] | null>(null);
  const [confirmPrice, setConfirmPrice] = useState<priceObject | null>(null);
  const [confirmReigon, setConfirmReigon] = useState<string[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('오후');
  const [marked, setMarked] = useState<number | null>(null);
  const [selectOption, setSelectOption] = useState(filter[0]);
  const [optionOpen, setOptionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setFilteringDate, setTime, setPeriod, filteringDate, Period } =
    useCalenderStore();

  const { data, isLoading, refetch } = useQuery<ICategoryData[]>({
    queryKey: [
      'categoryCake',
      category,
      confirmPrice,
      confirmReigon,
      confirmDesgin,
      filteringDate,
      marked,
    ],
    queryFn: () => {
      const realConfirmDesigon = confirmDesgin?.map((key) =>
        key.replace('케이크', '')
      );
      return cakeCategorySearchApi(
        getCategoryName(category),
        filteringDate?.toISOString().slice(0, -1),
        confirmPrice?.max,
        confirmReigon,
        realConfirmDesigon
      );
    },
  });
  const { data: cakeScrap } = useQuery<CakeScrap[]>({
    queryKey: ['cakeScrap', marked],
    queryFn: () => getCakeDesigns(),
  });

  const onOrder = (cake_id: number) => {
    router.push(`/cakeDetail/${cake_id}`);
  };

  // 새로운 데이터가 로드될 때만 정렬
  useEffect(() => {
    if (data) {
      if (sortedCakeData) return;
      const sortedData = data.toSorted((a, b) => b.scrapCount - a.scrapCount);
      setSortedCakeData(sortedData);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOptionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSameDay = (date1: Date, date2: Date) => {
    if (date1) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
  };

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

  const handleScrapCake = async (cakeId: number) => {
    try {
      if (!data?.find((i) => i.cakeId === cakeId)?.isScraped) {
        const response = await toggleMark(cakeId);
        if (response) {
          setMarked(Date.now());
          // 즉시 UI 업데이트 추가
          setSortedCakeData(
            (prev) =>
              prev?.map((cake) =>
                cake.cakeId === cakeId ? { ...cake, isScraped: false } : cake
              ) ?? null
          );
        }
      } else {
        const isScraped = await scrapCake(cakeId, false);
        if (isScraped) {
          setMarked(Date.now());
          // 즉시 UI 업데이트 추가
          setSortedCakeData(
            (prev) =>
              prev?.map((cake) =>
                cake.cakeId === cakeId ? { ...cake, isScraped: true } : cake
              ) ?? null
          );
        }
      }
      refetch();
    } catch (error) {
      console.error('스크랩 API 호출 중 오류:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <BottomSheet
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          initName={filterName}
          setConfirmDesgin={setConfirmDesgin}
          setConfirmReigon={setConfirmReigon}
          setConfirmPrice={setConfirmPrice}
        />
      )}
      <div className="flex flex-col min-h-screen">
        {/* Header */}

        <Header
          leftButtonImage={<Image src={back} alt="back" />}
          centerText={getCategoryName(category) || '카테고리 없음'}
          rightButtonImage={[
            <Image key="Alarm" src={alarm} width={24} height={24} alt="alrm" />,
          ]}
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
            {isSameDay(filteredDate, new Date()) ? '오늘 ' : ''}
            {`(${days[filteredDate.getDay()]})`}
          </div>
          <div>
            {Period}&nbsp;
            {filteredDate.toLocaleString() === new Date().toLocaleString()
              ? ''
              : `${filteredDate.getHours()}:${filteredDate.getMinutes() === 0 ? '00' : filteredDate.getMinutes()}`}
          </div>
          <Image src={down} alt="arrow_down" className="right-1 absolute" />
        </div>
        {/* Category Tabs */}
        <div className="flex  relative gap-2 px-5 py-3.5 font-medium">
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex  outline-none items-center gap-2 text-sm  bg-grayscale100  px-3 py-1
                ${optionOpen ? 'rounded-t-2xl ' : 'rounded-2xl '}
                `}
              onClick={() => setOptionOpen(!optionOpen)}
            >
              {selectOption}
              <Image src={down} alt="arrow_down" />
            </button>
            {optionOpen && (
              <div className="absolute z-10">
                {filter.map((i) => (
                  <button
                    key={i}
                    className={`flex   items-center gap-2 text-sm  bg-grayscale100  px-3 py-1
                      ${i === filter[filter.length - 1] ? 'rounded-b-md ' : ''}
                      `}
                    onClick={() => {
                      setSelectOption(i);
                      setOptionOpen(false);
                    }}
                  >
                    {i}
                    <span className="w-4"></span>
                  </button>
                ))}
              </div>
            )}
          </div>

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Cake Grid */}
            {data ? (
              <>
                <div className="grid grid-cols-2 gap-1.5 px-5 py-2.5 ">
                  {sortedCakeData?.map((cake: ICategoryData) => (
                    <div
                      key={cake.cakeId}
                      className=" relative cursor-pointer   overflow-hidden mb-2.5"
                    >
                      <Image
                        src={cake.cakeImage}
                        alt={cake.cakeName}
                        width={300}
                        height={300}
                        className="w-full  object-cover"
                        onClick={() => onOrder(cake.cakeId)}
                      />
                      <button
                        className="absolute top-2 right-2 p-1"
                        onClick={() => handleScrapCake(cake.cakeId)}
                      >
                        {cake.isScraped ? (
                          <FilledMarkIcon />
                        ) : (
                          <Image src={mark} alt="mark" width={24} height={24} />
                        )}
                      </button>

                      <div
                        className="pt-1.5 bottom-0 z-10 font-bold text-xs text-grayscale900"
                        onClick={() => onOrder(cake.cakeId)}
                      >
                        <h3 className="font-bold text-xs text-grayscale900">
                          {cake.cakeName}
                        </h3>
                        <p className=" text-xs text-grayscale900 font-semibold">
                          {cake.cakePrice?.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm py-5">
                해당되는 케이크가 없습니다.
              </div>
            )}
          </>
        )}

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
