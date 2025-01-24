'use client';
import React from 'react';
import Image from 'next/image';
import useUserStore from '@/app/store/userStore';

import DefaultProfile from '../../../../public/my-log-images/profile-photo.svg';

const UserInfo: React.FC = () => {
  const user = useUserStore((state) => state.userInfo);
  return (
    <section
      className="flex px-5 items-start"
      aria-labelledby="user-info-heading"
    >
      {/* 왼쪽 프로필 사진 */}
      <figure className="flex-shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={user?.profileImage || DefaultProfile}
            alt={`${user?.username}의 프로필 사진`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </figure>
      {/* 오른쪽 닉네임과 한줄소개 */}
      <div className="ml-4 pt-2 flex flex-col justify-center flex-grow">
        <h1 id="user-info-heading" className="text-lg font-bold text-black">
          {user?.username}
        </h1>
        {user?.description && (
          <p className="text-sm text-grayscale700 h-11 overflow-hidden text-ellipsis line-clamp-2">
            {user?.description ||
              '소개글을 입력하세요. 소개글을 입력하세요. 소개글을 입력하세요.소개글을 입력하세요.소개글을 입력하세요. '}
          </p>
        )}
      </div>
    </section>
  );
};

export default UserInfo;
