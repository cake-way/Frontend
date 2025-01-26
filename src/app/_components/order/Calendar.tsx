'use client';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { amTimes, pmTimes } from '../../../../constants/constants';
import { TimeSlotResponse } from 'types/relatedCake';
import { useQuery } from '@tanstack/react-query';
import { orderTimeSlotApi } from '@/app/_lib/shopApi';
import { ComponentType, useState } from 'react';

interface CalendarComponentProps {
  selectedDate: Date;
  selectedTime: string | null;
  selectedPeriod: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
  shopId?: number;
  cakeShopId?: number;
  availableTimes?: string[];
  tileDisabled?: (props: { date: Date }) => boolean;
  onActiveStartDateChange?: (args: OnArgs) => void;
}
interface WithTimeSlotsProps {
  cakeShopId?: number;
  selectedDate: Date;
  selectedTime: string | null;
  selectedPeriod: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
}
export const withTimeSlots = <P extends WithTimeSlotsProps>(
  WrappedComponent: ComponentType<
    P & { tileDisabled?: (props: { date: Date }) => boolean }
  >
) => {
  return function WithTimeSlotsComponent(props: P) {
    const { cakeShopId } = props;
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    const { data: timeSlots } = useQuery<TimeSlotResponse>({
      queryKey: ['timeSlots', cakeShopId, currentViewDate],
      queryFn: async () => {
        if (!cakeShopId) {
          return null;
        }
        let monthStart = new Date(
          currentViewDate.getFullYear(),
          currentViewDate.getMonth(),
          1
        );
        if (monthStart.getMonth() === new Date().getMonth())
          monthStart = new Date();
        const monthEnd = new Date(
          currentViewDate.getFullYear(),
          currentViewDate.getMonth() + 1,
          0
        );
        return await orderTimeSlotApi(
          cakeShopId,
          monthStart.toISOString(),
          monthEnd.toISOString()
        );
      },
      enabled: !!cakeShopId,
    });
    console.log(timeSlots);
    const getAvailableTimesForDate = (date: Date) => {
      if (!timeSlots?.availableTimes) return [];

      return timeSlots.availableTimes
        .filter((timeStr) => {
          const timeSlot = new Date(timeStr);
          return (
            timeSlot.getDate() === date.getDate() &&
            timeSlot.getMonth() === date.getMonth() &&
            timeSlot.getFullYear() === date.getFullYear()
          );
        })
        .map((timeStr) => {
          const timeSlot = new Date(timeStr);
          const hours = timeSlot.getHours();
          const minutes = timeSlot.getMinutes();
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        });
    };

    const tileDisabled = ({ date }: { date: Date }) => {
      if (!timeSlots?.availableTimes) return false;
      return !timeSlots.availableTimes.some((timeStr) => {
        const timeSlot = new Date(timeStr);
        return (
          timeSlot.getDate() === date.getDate() &&
          timeSlot.getMonth() === date.getMonth() &&
          timeSlot.getFullYear() === date.getFullYear()
        );
      });
    };
    return (
      <WrappedComponent
        {...props}
        tileDisabled={cakeShopId ? tileDisabled : undefined}
        onActiveStartDateChange={({
          activeStartDate,
        }: {
          activeStartDate: Date;
        }) => {
          if (activeStartDate) {
            setCurrentViewDate(activeStartDate);
          }
        }}
        availableTimes={getAvailableTimesForDate(props.selectedDate)}
      />
    );
  };
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  selectedDate,
  selectedPeriod,
  selectedTime,
  setSelectedDate,
  setSelectedPeriod,
  setSelectedTime,
  availableTimes,
  tileDisabled,
  onActiveStartDateChange,
}) => {
  return (
    <div className=" w-full  relative bg-[#ffffff] rounded-lg  overflow-hidden max-w-[480px]">
      <section className="mb-6 p-4">
        <h3 className="text-lg font-bold mb-4">날짜 · 시간</h3>

        {/* Calendar */}
        <div
          className={`
        [&_.react-calendar]:border-none 
        [&_.react-calendar]:w-full
        [&_.react-calendar__month-view__weekdays]:uppercase
        [&_.react-calendar__month-view__weekdays]:font-bold
        [&_.react-calendar__month-view__weekdays__weekday]:text-center
        [&_.react-calendar__month-view__days__day--weekend]:text-red-500
        [&_.react-calendar__tile]:p-2
        [&_.react-calendar__tile]:text-center
        [&_.react-calendar__tile:enabled:hover]:bg-gray-100
        [&_.react-calendar__tile--active]:!bg-[#FA2840]
        [&_.react-calendar__navigation button:disabled]:!bg-transparent
        [&_.react-calendar__tile--active]:!text-black
        [&_.react-calendar__tile:disabled]:!bg-transparent
        [&_.react-calendar__tile:disabled]:!text-black
          [&_.react-calendar__navigation__label__labelText]:font-pretendard
        [&_.react-calendar__navigation__label__labelText]:text-[16px]
        [&_.react-calendar__navigation__label__labelText]:font-bold
        [&_.react-calendar__navigation__label__labelText]:text-[#2D2D2D]
        [&_.react-calendar__navigation__label__labelText]:leading-5
          [&_.react-calendar__tile--now]:bg-transparent
          [&_.react-calendar__navigation__label]:!flex-grow-0
       
`}
        >
          <Calendar
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
            locale="ko-KR"
            formatDay={(locale, date) => date.getDate().toString()}
            maxDetail="month" // 월간 뷰만 사용
            minDetail="month" // 월간 뷰만 사용
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
            className="mb-4"
            next2Label={null} // 더블 화살표 제거
            prev2Label={null} // 더블 화살표 제거
            tileClassName="rounded"
            tileDisabled={tileDisabled}
            onActiveStartDateChange={onActiveStartDateChange}
          />
        </div>

        {/* Time Selection */}
        <div className="flex items-center gap-4">
          <span
            className={` cursor-pointer text-sm font-medium text-gray-500
              ${selectedPeriod === '오전' ? 'text-[#292929]' : 'text-grayscale500'}`}
            onClick={() => setSelectedPeriod('오전')}
          >
            오전
          </span>
          <span
            className={`cursor-pointer text-sm font-medium text-gray-500
            

              ${selectedPeriod === '오후' ? 'text-[#292929]' : 'text-grayscale500'}
           
            `}
            onClick={() => setSelectedPeriod('오후')}
          >
            오후
          </span>
        </div>
        <div className="flex   max-w-full overflow-x-auto gap-2 mt-2">
          {(selectedPeriod === '오후' ? pmTimes : amTimes)
            .filter((time) => availableTimes?.includes(time))
            .map((time) => (
              <button
                key={time}
                className={`whitespace-nowrap px-3 py-2 text-sm rounded-md ${
                  selectedTime === time
                    ? 'bg-primaryRed1 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {selectedPeriod}&nbsp;
                {time}
              </button>
            ))}
        </div>
      </section>
    </div>
  );
};

export default CalendarComponent;

// Usage
const TimeSlotCalendar = withTimeSlots(CalendarComponent);
export { TimeSlotCalendar };
