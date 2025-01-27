'use client';

import Image from 'next/image';
import BackIcon from '../../../../../public/header-images/back.svg';
import DefaultProfile from '../../../../../public/my-log-images/profile-photo.svg';
import { useRouter } from 'next/navigation';

interface ThumbnailProps {
  thumbnailImage: string | File | null; // File 타입 추가
  setThumbnailImage: (value: string | File | null) => void; // File 타입 지원
  logTitle: string;
  setLogTitle: (value: string) => void;
  userProfileImage: string; // 프로필 사진 URL
  username: string; // 사용자 이름
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnailImage,
  setThumbnailImage,
  logTitle,
  setLogTitle,
  userProfileImage,
  username,
}) => {
  const router = useRouter();
  const today = new Date().toLocaleDateString();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailImage(file); // File 객체 저장
    }
  };

  return (
    <article
      className={`w-full h-[418px] p-5 flex flex-col cursor-pointer bg-gray-100 ${thumbnailImage ? 'bg-cover bg-center' : ''}`}
      style={{
        backgroundImage:
          thumbnailImage && typeof thumbnailImage !== 'string'
            ? `url(${URL.createObjectURL(thumbnailImage)})` // File 객체일 경우 URL 생성
            : `url(${thumbnailImage})`, // string일 경우 string을 그대로 사용
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
        } text-gray-400 mx-auto font-semibold h-6 flex items-center justify-center`}
      >
        대표 사진 추가하기
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
            placeholder="케이크 로그 제목을 입력해 주세요."
            className="w-3/5 font-semibold mt-8 text-[24px] text-white py-3 bg-transparent border-none outline-none resize-none"
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
          <p className="font-medium text-sm text-gray-700">
            {username || '익명 사용자'}
          </p>
          <time className="text-gray-500 text-[12px]">{today}</time>
        </div>
      </footer>
    </article>
  );
};

export default Thumbnail;
