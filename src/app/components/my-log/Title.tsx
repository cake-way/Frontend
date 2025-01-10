'use client';

import React from 'react';
import Image from 'next/image';

import ArrowIcon from '../../../../public/my-log-images/arrow-forward.svg';

interface HeaderProps {
  title: string; // 헤더 제목
}

const Title: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between w-full">
      <span className="justify-start text-title2">{title}</span>
      <button className="flex items-center justify-end text-body2">
        전체보기
        <Image
          src={ArrowIcon}
          alt="Arrow Forward"
          className="ml-1" // 텍스트와 이미지 간의 간격
        />
      </button>
    </header>
  );
};

export default Title;
