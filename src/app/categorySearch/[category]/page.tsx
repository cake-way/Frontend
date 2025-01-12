'use client';

import Header from '@/app/components/Header';
import { useParams } from 'next/navigation';
import back from '../../../../public/header-images/back.svg';
import Image from 'next/image';
import { getCategoryParam } from '../../../../constants/constants';
import { getCategoryName } from '../../../../utils/utils';

export default function CategorySearch() {
  const params = useParams();
  const category = params?.category as keyof typeof getCategoryParam;

  return (
    <div>
      <Header
        leftButtonImage={<Image src={back} alt="back" />}
        centerText={getCategoryName(category) || '카테고리 없음'}
      ></Header>
      {getCategoryName(category)}케이크 이미지검색
    </div>
  );
}
