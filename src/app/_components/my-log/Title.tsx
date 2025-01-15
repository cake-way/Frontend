'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ArrowIcon from '../../../../public/my-log-images/arrow-forward.svg';

interface HeaderProps {
  title: string; // 헤더 제목
  link?: string;
}

const Title: React.FC<HeaderProps> = ({ title, link = '' }) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push(link); // 해당 카테고리의 상세 페이지로 이동
  };
  return (
    <header className="flex justify-between w-full">
      <span className="justify-start text-title2">{title}</span>
      {link?.trim() && (
        <button
          onClick={handleViewAll}
          className="flex items-center justify-end text-body2"
        >
          전체보기
          <Image src={ArrowIcon} alt="Arrow Forward" className="ml-1" />
        </button>
      )}
    </header>
  );
};

export default Title;
