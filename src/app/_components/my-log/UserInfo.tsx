'use client';
import React from 'react';
import Image from 'next/image';

interface UserInfoProps {
  profileImage: string;
  nickname: string;
  introduction: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  profileImage,
  nickname,
  introduction,
}) => {
  return (
    <section
      className="flex px-5 items-start"
      aria-labelledby="user-info-heading"
    >
      {/* 왼쪽 프로필 사진 */}
      <figure className="flex-shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt={`${nickname}의 프로필 사진`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </figure>
      {/* 오른쪽 닉네임과 한줄소개 */}
      <div className="ml-4 pt-2 flex flex-col justify-center flex-grow">
        <h1 id="user-info-heading" className="text-lg font-bold text-black">
          {nickname}
        </h1>
        {introduction && (
          <p className="text-sm text-grayscale700 h-11 overflow-hidden text-ellipsis line-clamp-2">
            {introduction}
          </p>
        )}
      </div>
    </section>
  );
};

export default UserInfo;
