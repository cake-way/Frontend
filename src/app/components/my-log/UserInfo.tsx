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
      className="flex mt-[75px] px-[32px] items-center"
      aria-labelledby="user-info-heading"
    >
      {/* 왼쪽 프로필 사진 */}
      <figure className="flex-shrink-0">
        <Image
          src={profileImage}
          alt={`${nickname}의 프로필 사진`}
          width={80}
          height={80}
          className="rounded-full"
        />
      </figure>
      {/* 오른쪽 닉네임과 한줄소개 */}
      <div className="flex ml-4 flex-col">
        <h1 id="user-info-heading" className="text-lg font-bold text-black">
          {nickname}
        </h1>
        <p className="text-sm text-grayscale700">{introduction}</p>
      </div>
    </section>
  );
};

export default UserInfo;
