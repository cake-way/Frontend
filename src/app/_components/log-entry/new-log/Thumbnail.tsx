'use client';

import Image from 'next/image';

interface ThumbnailProps {
  thumbnailImage: string | null;
  setThumbnailImage: (value: string | null) => void;
  logTitle: string;
  setLogTitle: (value: string) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnailImage,
  setThumbnailImage,
  logTitle,
  setLogTitle,
}) => {
  const today = new Date().toLocaleDateString(); // 오늘 날짜 포맷팅

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailImage(URL.createObjectURL(file));
    }
  };

  return (
    <article
      className={`w-full max-w-lg h-[418px] p-5 flex flex-col justify-end cursor-pointer bg-gray-100 ${
        thumbnailImage ? 'bg-cover bg-center' : ''
      }`}
      style={{
        backgroundImage: thumbnailImage ? `url(${thumbnailImage})` : 'none',
      }}
      onClick={() => document.getElementById('imageInput')?.click()}
    >
      {!thumbnailImage && (
        <p className="text-gray-400 mx-auto font-bold mb-8">
          대표 사진 추가하기
        </p>
      )}

      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 막기
      />

      <header onClick={(e) => e.stopPropagation()}>
        <h1>
          <textarea
            placeholder="케이크 로그 제목을 입력해 주세요."
            className="w-[243px] font-bold text-[24px] text-white py-3 bg-transparent border-none outline-none resize-none"
            value={logTitle}
            onChange={(e) => setLogTitle(e.target.value)}
          />
        </h1>
      </header>

      <footer
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          width={40}
          height={40}
          src="/my-log-images/profile-photo.svg"
          className="rounded-full"
          alt="프로필 사진"
        />
        <div>
          <p className="font-medium text-sm text-gray-700">mellowy23</p>
          <time className="text-gray-500 text-[12px]">{today}</time>
        </div>
      </footer>
    </article>
  );
};

export default Thumbnail;
