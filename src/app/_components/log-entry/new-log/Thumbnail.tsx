'use client';

import Image from 'next/image';
import BackIcon from '../../../../../public/header-images/back.svg';
import Photo from '../../../../../public/log-entry/photo.svg';
import DefaultProfile from '../../../../../public/my-log-images/profile-photo.svg';
import { useRouter } from 'next/navigation';
import { ThumbnailProps } from 'types/cake-log/createLog';
import { useMemo } from 'react';

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnailImage,
  setThumbnailImage,
  logTitle,
  setLogTitle,
  userProfileImage,
  username,
}) => {
  const router = useRouter();

  // 캐싱된 날짜
  const today = useMemo(() => new Date().toLocaleDateString(), []);

  // 캐싱된 backgroundImage
  const backgroundImage = useMemo(() => {
    if (thumbnailImage && typeof thumbnailImage !== 'string') {
      return `url(${URL.createObjectURL(thumbnailImage)})`; // File 객체 처리
    }
    return `url(${thumbnailImage || ''})`; // string 처리
  }, [thumbnailImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailImage(file); // File 객체 저장
    }
  };

  return (
    <article
      className={`w-full h-[418px] p-5 flex flex-col cursor-pointer bg-grayscale100 ${
        thumbnailImage ? 'bg-cover bg-center' : ''
      }`}
      style={{
        backgroundImage, // Memoized backgroundImage 사용
      }}
      onClick={() => document.getElementById('imageInput')?.click()}
    >
      <div className="mb-36">
        <Image
          src={BackIcon}
          alt="뒤로 가기"
          onClick={(e) => {
            router.back();
            e.stopPropagation();
          }}
        />
      </div>

      {/* 사진 추가 버튼 영역 */}
      <div
        className={`${
          thumbnailImage ? 'invisible' : 'visible'
        }  mx-auto h-6 flex flex-col gap-3 items-center justify-center`}
      >
        <Image src={Photo} alt="사진 아이콘" />
        <span className="text-grayscale500 text-sm font-bold">
          대표 사진 추가하기
        </span>
      </div>

      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 막기
      />

      <header>
        <h1>
          <textarea
            placeholder="케이크 로그 제목을 입력해주세요"
            className="w-48 font-semibold mt-8 text-[24px] text-white pt-8 bg-transparent border-none outline-none resize-none placeholder:text-grayscale500"
            value={logTitle}
            onChange={(e) => setLogTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </h1>
      </header>

      <footer
        className="flex items-center gap-2 mt-auto" // footer를 항상 아래로 고정
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            width={40}
            height={40}
            src={userProfileImage || DefaultProfile} // 기본 이미지 처리
            className="w-full h-full object-cover"
            alt="프로필 사진"
          />
        </div>
        <div>
          <p className="font-medium text-sm text-grayscale700">
            {username || '익명 사용자'}
          </p>
          <p className="text-grayscale700 font-normal text-[12px]">{today}</p>
        </div>
      </footer>
    </article>
  );
};

export default Thumbnail;
