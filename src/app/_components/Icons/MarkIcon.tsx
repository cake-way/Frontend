import React from 'react';

interface MarkIconProps {
  fill?: string;
}

const MarkIcon: React.FC<MarkIconProps> = ({
  fill = 'white', // 기본 fill 색상: white
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.44922 2.92969H18.5522V20.6936L12.0007 16.4048L5.44922 20.6936V2.92969Z"
        fill={fill}
      />
    </svg>
  );
};

export default MarkIcon;
