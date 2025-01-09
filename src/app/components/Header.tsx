import React from 'react';

interface HeaderProps {
  leftButtonImage: React.ReactNode; // 왼쪽 버튼에 올 이미지 컴포넌트
  rightButtonImage?: React.ReactNode; // 우측 버튼에 올 이미지 컴포넌트
  centerText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  centerComponent?: React.ReactNode; // 컴포넌트를 받을 수 있도록 설정
  borderBottom?: boolean; // borderBottom 유무를 받는 prop
}

const Header: React.FC<HeaderProps> = ({
  leftButtonImage,
  rightButtonImage,
  centerText,
  onLeftButtonClick,
  onRightButtonClick,
  centerComponent,
  borderBottom = false, // 기본값은 false
}) => {
  return (
    <header className="bg-[#FFF] text-[#131313] flex justify-between px-8 items-center sticky top-0  z-50 w-full h-[75px]">
      <button
        onClick={onLeftButtonClick}
        className="py-2 rounded-md flex items-center"
      >
        {leftButtonImage}
      </button>

      <div className="flex-1 text-center">
        {centerComponent ? (
          centerComponent // centerComponent가 있으면 렌더링
        ) : (
          <h1 className="text-title2 font-Pretendard">{centerText}</h1>
        )}
      </div>

      {rightButtonImage && (
        <button
          onClick={onRightButtonClick}
          className="py-2 rounded-md flex items-center"
        >
          {rightButtonImage}
        </button>
      )}
      {borderBottom && (
        <div className="absolute bottom-0 w-full border-b border-gray-300" />
      )}
    </header>
  );
};

export default Header;
