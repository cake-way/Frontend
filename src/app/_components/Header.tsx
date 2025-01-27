'use client';
import React from 'react';

interface HeaderProps {
  leftButtonImage: React.ReactNode; // 왼쪽 버튼에 올 이미지 컴포넌트
  rightButtonImage?: React.ReactNode[]; // 배열로 수정
  centerText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: (() => void)[]; // 배열로 수정 (각 버튼별 클릭 이벤트 처리)
  centerComponent?: React.ReactNode; // 컴포넌트를 받을 수 있도록 설정
  borderBottom?: boolean; // borderBottom 유무를 받는 prop
  backgroundTransparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  leftButtonImage,
  rightButtonImage = [],
  centerText,
  onLeftButtonClick,
  onRightButtonClick = [],
  centerComponent,
  borderBottom = false,
  backgroundTransparent = false,
}) => {
  // 오른쪽 아이콘이 두 개인 경우 확인
  const isTwoIcons = rightButtonImage.length === 2;

  return (
    <header
      className={` text-[#131313] flex gap-2 justify-between px-5 items-center  top-0 z-50 w-full h-[60px] ${
        borderBottom ? 'border-b border-gray-300' : ''
      }
      ${backgroundTransparent ? 'absolute bg-transparent' : 'sticky  bg-[#FFF]'}
      `}
    >
      <button
        onClick={onLeftButtonClick}
        className="py-2 rounded-md flex items-center"
      >
        {leftButtonImage}
      </button>

      <div
        className={`flex-1 text-center ${isTwoIcons ? 'translate-x-2' : ''}`}
      >
        {centerComponent ? (
          centerComponent
        ) : (
          <h1
            className={`text-xl  font-semibold ${backgroundTransparent ? 'text-[#ffffff]' : ' '}`}
          >
            {centerText}
          </h1>
        )}
      </div>

      <div className={`flex  ${rightButtonImage.length ? '' : 'w-6'}`}>
        {rightButtonImage.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              if (onRightButtonClick && onRightButtonClick[index]) {
                onRightButtonClick[index](); // index가 유효할 때만 호출
              }
            }}
            className="py-2 rounded-md flex"
          >
            {image}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
