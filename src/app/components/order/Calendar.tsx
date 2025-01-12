'use client';
import useCalenderStore from '@/app/store/calendarStore';
import { useState } from 'react';

// import Header from '../Header';
// import back from '../../../../public/header-images/back.svg';
// import Image from 'next/image';

interface ICalendar {
  setCalendarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar: React.FC<ICalendar> = ({ setCalendarOpen }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedDateNumber, setSelectedDateNumber] = useState(0);

  const { setDateNumber, setDate, setTime, setPeriod } = useCalenderStore();

  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // 1일부터 30일까지
  const times = ['12:00', '1:00', '2:00', '3:00', '4:00']; // 시간대

  const onResult = () => {
    setDateNumber(selectedDateNumber);
    setDate(selectedDate);
    setTime(selectedTime);
    setPeriod(selectedPeriod);

    if (setCalendarOpen) {
      setCalendarOpen(false);
    }
  };

  return (
    <div className="p-4 w-full mx-auto bg-[#ffffff]  rounded-lg">
      {/* Date and Time */}
      <section className="mb-6">
        <h3 className="text-base font-bold mb-4">날짜 · 시간</h3>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="text-gray-600"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  selectedDateNumber
                )
              )
            }
          >
            &lt;
          </button>
          <span className="font-medium text-gray-800">{`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}</span>
          <button
            className="text-gray-600"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  selectedDateNumber
                )
              )
            }
          >
            &gt;
          </button>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 text-center mb-4">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span key={day} className="text-sm font-medium text-gray-500">
              {day}
            </span>
          ))}
          {dates.map((date) => (
            <button
              key={date}
              className={`p-2 text-sm font-medium rounded-full ${
                selectedDateNumber === Number(date)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedDateNumber(Number(date))}
            >
              {date}
            </button>
          ))}
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
        <div className="flex flex-wrap gap-2 mt-2">
          {times.map((time) => (
            <button
              key={time}
              className={`px-3 py-2 text-sm rounded-lg ${
                selectedTime === time
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              오후 {time}
            </button>
          ))}
        </div>
      </section>
      {/* Footer */}
      {setCalendarOpen && (
        <footer className="flex justify-between p-4">
          <button
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg"
            onClick={() => setCalendarOpen(false)}
          >
            닫기
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg"
            onClick={onResult}
          >
            결과 보기
          </button>
        </footer>
      )}
    </div>
  );
};

export default Calendar;
