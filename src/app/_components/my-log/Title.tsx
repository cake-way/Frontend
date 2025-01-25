'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ArrowIcon from '../../../../public/my-log-images/arrow-forward.svg';

interface HeaderProps {
  title: string;
  link?: string; // 나의 케이크 로그도 포함
  length?: number;
}

const Title: React.FC<HeaderProps> = ({ title, link = '', length = 0 }) => {
  const router = useRouter();

  const handleViewAll = () => {
    // 배열의 length가 0일 경우 홈으로 이동, 그렇지 않으면 해당 링크로 이동
    if (length === 0) {
      router.push(link); // 홈으로 이동
    } else {
      router.push(link); // 해당 카테고리의 상세 페이지로 이동
    }
  };

  return (
    <header className="flex justify-between w-full">
      <span className="justify-start text-title2">{title}</span>
      {link?.trim() && (
        <button
          onClick={handleViewAll}
          className="flex items-center justify-end text-body2"
        >
          {length === 0 ? '둘러보기' : '전체보기'}
          <Image src={ArrowIcon} alt="Arrow Forward" className="ml-1" />
        </button>
      )}
    </header>
  );
};

export default Title;
