'use client';

import React, { useState, useRef, useEffect } from 'react';
import CakeShopCard from './CakeShopCard';
import { cakeShops } from '../../../../constants/mockData';

const DraggableBottomSheet: React.FC = () => {
  const [position, setPosition] = useState(0); // Bottom Sheet의 Y 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const startYRef = useRef(0); //  드래그 시작 위치
  const currentYRef = useRef(0); // 상대적인 현재 위치
  const realCurrentRef = useRef(0); //실제 y현재위치
  const dragRef = useRef(false);

  // 드래그 중일 때 window에 이벤트 리스너 추가
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
    }

    // 클린업 함수
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    startYRef.current = startY - currentYRef.current;

    // if (startYRef.current === 0) {
    //   startYRef.current = position;
    // }
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;

    dragRef.current = true;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newPosition = currentY - startYRef.current;

    if (newPosition === position) {
      dragRef.current = false;
    }
    // 제한 범위 설정 (화면의 최대/최소 높이)

    if (
      currentY >= window.innerHeight * 0.15 &&
      currentY <= window.innerHeight * 0.85
    ) {
      setPosition(newPosition);
      currentYRef.current = newPosition;
      realCurrentRef.current = currentY;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // if (startYRef.current === 0) {
    //   setPosition(0);
    //   currentYRef.current = 0;
    //   return;
    // }

    console.log(dragRef.current);
    //드래그안했을때
    if (!dragRef.current) {
      setPosition(0);
      currentYRef.current = 0;
    }
    //닫힘
    if (realCurrentRef.current > window.innerHeight * 0.7) {
      setPosition(window.innerHeight * 0.4);
      currentYRef.current = window.innerHeight * 0.4;
    }
    //열림
    else if (
      realCurrentRef.current < window.innerHeight * 0.3 &&
      realCurrentRef.current !== 0
    ) {
      setPosition(-window.innerHeight * 0.3);
      currentYRef.current = -window.innerHeight * 0.2;
    } else {
      setPosition(0);
      currentYRef.current = 0;
    }
  };

  return (
    <div
      className=" absolute inset-x-0 -bottom-[25%] z-50 bg-[#ffffff] rounded-t-2xl shadow-lg max-h-[80vh] max-w-[480px] overflow-hidden w-full mx-auto"
      style={{
        transform: `translateY(${position}px)`,
        // transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      <div className="">
        {/* Drag Indicator */}
        <div
          className="w-full h-full p-4"
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
        >
          {' '}
          <div className=" h-1 w-16 bg-gray-300 rounded-full mx-auto  cursor-pointer" />
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Example items */}

          {cakeShops.map((shop, index) => (
            <CakeShopCard
              key={index}
              scrap_count={shop.scrap_count}
              name={shop.name}
              time={shop.close_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableBottomSheet;
