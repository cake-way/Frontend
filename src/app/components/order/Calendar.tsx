'use client';
import useCalenderStore from '@/app/store/calendarStore';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarComponentProps {
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  setCalendarOpen,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('오후');

  const { setFilteringDate, setTime, setPeriod } = useCalenderStore();

  const pmTimes = [
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',
  ]; // 시간대
  const amTimes = ['11:00', '11:30'];

  const getHoursMinutes = (selectedPeriod: string, selectedTime: string) => {
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = selectedTime.split(':').map(Number);
    if (selectedPeriod === '오후' && hours !== 12) {
      hours = hours + 12;
    }
    return [hours, minutes];
  };

  const onResult = () => {
    if (selectedDate && selectedPeriod && selectedTime) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        ...getHoursMinutes(selectedPeriod, selectedTime)
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
    <div className="p-4 w-full bg-[#ffffff] rounded-lg shadow-lg overflow-hidden max-w-[480px]">
      <section className="mb-6">
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
            onChange={(value) => setSelectedDate(value as Date | null)}
            locale="ko-KR"
            formatDay={(locale, date) => date.getDate().toString()}
            maxDetail="month" // 월간 뷰만 사용
            minDetail="month" // 월간 뷰만 사용
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
            className="mb-4"
            next2Label={null} // 더블 화살표 제거
            prev2Label={null} // 더블 화살표 제거
            // Tailwind classes for calendar
            tileClassName="rounded"
          />
        </div>

        {/* Time Selection */}
        <div className="flex items-center gap-4">
          <span
            className={`text-sm font-medium text-gray-500
              ${selectedPeriod === '오전' ? 'text-[#292929]' : 'text-grayscale500'}`}
            onClick={() => setSelectedPeriod('오전')}
          >
            오전
          </span>
          <span
            className={`text-sm font-medium text-gray-500
            

              ${selectedPeriod === '오후' ? 'text-[#292929]' : 'text-grayscale500'}
           
            `}
            onClick={() => setSelectedPeriod('오후')}
          >
            오후
          </span>
        </div>
        <div className="flex  X$ max-w-full overflow-x-auto gap-2 mt-2">
          {(selectedPeriod === '오후' ? pmTimes : amTimes).map((time) => (
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

      {/* Footer */}
      {setCalendarOpen && (
        <footer className="flex gap-3 justify-between mt-6">
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
      )}
    </div>
  );
};

export default CalendarComponent;
