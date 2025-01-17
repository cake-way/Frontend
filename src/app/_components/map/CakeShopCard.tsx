import React from 'react';
import { getHoursMinutes } from '../../../../utils/utils';

interface ICakeShopCard {
  name: string;
  time: string;
}
const CakeShopCard = ({ name, time }: ICakeShopCard) => {
  //   console.log(
  //     new Date().toDateString() >
  //       new Date(
  //         new Date().getFullYear(),
  //         new Date().getMonth(),
  //         new Date().getDay(),
  //         ...getHoursMinutes(time)
  //       ).toDateString()
  //   );
  //   console.log(new Date().toDateString());
  //   console.log(
  //     new Date(
  //       new Date().getFullYear(),
  //       new Date().getMonth(),
  //       new Date().getDay(),
  //       ...getHoursMinutes(time)
  //     ).toDateString()
  //   );
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex items-center mt-1">
            <svg
              className="w-4 h-4 text-yellow-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm text-gray-600">
              {Date.now().toLocaleString() > new Date(time).toDateString()
                ? '영업중'
                : '마감'}
              {time} 에 라스트 오더
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 grid grid-cols-4 gap-2">
        <img
          src="/api/placeholder/400/400"
          alt="분홍색 딸기 케이크"
          className="w-full h-40 object-cover rounded-lg"
        />
        <img
          src="/api/placeholder/400/400"
          alt="화이트 딸기 케이크"
          className="w-full h-40 object-cover rounded-lg"
        />
        <img
          src="/api/placeholder/400/400"
          alt="하늘색 딸기 케이크"
          className="w-full h-40 object-cover rounded-lg"
        />
        <img
          src="/api/placeholder/400/400"
          alt="화이트 크라운 딸기 케이크"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default CakeShopCard;
