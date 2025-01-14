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
}

const Header: React.FC<HeaderProps> = ({
  leftButtonImage,
  rightButtonImage = [],
  centerText,
  onLeftButtonClick,
  onRightButtonClick = [],
  centerComponent,
  borderBottom = false,
}) => {
  return (
    <header className="bg-[#FFF] text-[#131313] flex justify-between px-8 items-center sticky top-0  z-50 w-full h-[var(--header-height)]">
      <button
        onClick={onLeftButtonClick}
        className="py-2 rounded-md flex items-center"
      >
        {leftButtonImage}
      </button>

      <div className="flex-1 text-center">
        {centerComponent ? (
          centerComponent
        ) : (
          <h1 className="text-[20px] font-bold">{centerText}</h1>
        )}
      </div>

      <div className="flex items-center">
        {rightButtonImage.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              if (onRightButtonClick && onRightButtonClick[index]) {
                onRightButtonClick[index](); // index가 유효할 때만 호출
              }
            }}
            className="py-2 rounded-md flex items-center"
          >
            {image}
          </button>
        ))}
      </div>

      {borderBottom && (
        <div className="absolute bottom-0 w-full border-b border-gray-300" />
      )}
    </header>
  );
};

export default Header;
