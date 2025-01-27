'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BackIcon from '../../../public/header-images/back.svg';
import Header from '../_components/Header';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/store/userStore';

import DefaultProfile from '../../../public/my-log-images/profile-photo.svg';

const ProfileEdit = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserStore();

  // 상태 초기화
  const [nickname, setNickname] = useState(userInfo?.username || '');
  const [description, setDescription] = useState(userInfo?.description || '');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // 프로필 이미지 상태
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    userInfo?.profileImage || null
  ); // 미리보기 이미지 상태

  const handleLeftButtonClick = () => {
    router.back();
  };

  // 프로필 사진 변경 처리
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImageFile(file);

      // 선택된 이미지를 미리 보여주기 위해 ObjectURL을 사용
      const imageUrl = URL.createObjectURL(file);
      setProfileImagePreview(imageUrl); // 미리보기 상태 업데이트
    }
  };

  // 기존 프로필 이미지를 파일로 전환할 수 없기 때문에
  // URL을 그대로 보내는 방법을 유지하려면
  // URL을 파일로 전송해야 할 경우엔
  // 서버에서 URL을 받아들이지 않으면 이 방법을 사용해야 함...
  const handleSubmit = async () => {
    const formData = new FormData();

    // nickname이 변경되었으면 새로운 값을 추가
    formData.append(
      'username',
      nickname !== userInfo?.username ? nickname : userInfo?.username
    );

    // description이 변경되었으면 새로운 값을 추가
    formData.append(
      'description',
      description !== userInfo?.description
        ? description
        : userInfo?.description
    );

    // 프로필 이미지가 변경되었으면 새로운 이미지를 추가, 아니면 기존 이미지를 파일로 전환하여 추가
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    } else if (userInfo?.profileImage) {
      const response = await fetch(userInfo?.profileImage);
      const blob = await response.blob(); // Blob 형태로 변환
      formData.append('profileImage', blob, 'profileImage.jpg'); // 파일 형식으로 보내기
    }

    // FormData 확인
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage`,
        {
          method: 'PUT',
          body: formData,
          headers: { Authorization: `Bearer ${token}` }, // 인증 헤더는 유지, Content-Type은 설정하지 않음
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('프로필 수정 완료:', data);

        // 수정된 정보로 userInfo 업데이트
        setUserInfo({
          userInfo: {
            ...userInfo!,
            username: nickname,
            description: description,
            profileImage: profileImageFile
              ? URL.createObjectURL(profileImageFile)
              : userInfo?.profileImage || DefaultProfile,
          },
          designScrap: [],
          storeScrap: [],
          logScrap: [],
        });

        router.back();
      } else {
        console.error('프로필 수정 실패:', await response.text());
      }
    } catch (error) {
      console.error('프로필 수정 중 에러 발생:', error);
    }
  };

  // 공통 클래스 정의
  const commonButtonClass =
    'w-[48%] py-2 rounded-[4px] transition-all duration-300 focus:outline-none';

  return (
    <main className="w-full flex flex-col items-center">
      <Header
        leftButtonImage={<Image src={BackIcon} alt="back" />}
        onLeftButtonClick={handleLeftButtonClick}
        centerText="프로필 수정"
        borderBottom={true}
      />

      {/* 프로필 정보 */}
      <section className="w-full flex flex-col mt-12 gap-4 px-5">
        {/* 프로필 사진 */}
        <div className="relative mx-auto w-24 h-24">
          <Image
            src={profileImagePreview || DefaultProfile} // 선택된 이미지가 있으면 그걸, 없으면 기본 이미지
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* 프로필 사진 수정 텍스트 */}
        <label
          htmlFor="profileImage"
          className="text-sm mx-auto text-gray-500 cursor-pointer"
        >
          프로필 사진 수정
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImageChange}
        />

        {/* 닉네임 입력 */}
        <p className="font-bold text-lg mt-5">닉네임</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full h-12 px-3 py-2 bg-gray-100 border border-none outline-none rounded-sm text-sm caret-primaryRed1"
        />

        {/* 취향 소개 입력 */}
        <p className="font-bold text-lg mt-4">취향 소개</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="나만의 케이크 취향을 알려주세요! (최대 30자)"
          className="w-full px-4 py-3 bg-gray-100 border border-none outline-none rounded-sm text-sm h-28 resize-none caret-primaryRed1"
        ></textarea>

        {/* 저장 버튼 */}
        <footer className="w-full flex justify-between mt-24 mb-11">
          <button
            className={`${commonButtonClass} text-gray-700 border border-gray-400`}
          >
            취소
          </button>
          <button
            className={`${commonButtonClass} text-white bg-black`}
            onClick={handleSubmit}
          >
            저장
          </button>
        </footer>
      </section>
    </main>
  );
};

export default ProfileEdit;
