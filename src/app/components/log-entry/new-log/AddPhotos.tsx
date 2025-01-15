'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButtonIcon from '../../../../../public/log-entry/add.svg';

interface AddPhotosProps {
  photos: File[];
  setPhotos: (photos: File[]) => void;
}

const AddPhotos: React.FC<AddPhotosProps> = ({ photos, setPhotos }) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);

    // 파일이 10개 이상이면 경고
    if (photos.length + selectedFiles.length > 10) {
      alert('최대 10개의 사진만 추가할 수 있습니다.');
      return;
    }

    setPhotos([...photos, ...selectedFiles]);
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <section className="w-full px-5 mt-5">
      <header>
        <h2 className="font-semibold">사진 첨부</h2>
        <p className="text-[12px]">
          사진을 선택하시면 포스팅에 업로드 될 거예요!
        </p>
      </header>

      <Swiper spaceBetween={10} slidesPerView={3}>
        <SwiperSlide>
          <label
            htmlFor="photo-upload"
            className="w-[110px] h-[143px] mt-3 border-2 border-gray-300 flex flex-col items-center justify-center cursor-pointer"
          >
            <Image src={AddButtonIcon} alt="사진 추가" />
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <p className="text-gray-400 text-xs mt-1">{`${photos.length}/10`}</p>
          </label>
        </SwiperSlide>

        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-[110px] h-[143px] mt-3">
              <Image
                src={URL.createObjectURL(photo)}
                alt="첨부 사진"
                layout="fill"
                objectFit="cover"
              />
              <button
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white w-5 h-5 rounded-full flex items-center justify-center"
                onClick={() => handleDeletePhoto(index)}
                aria-label={`사진 ${index + 1} 삭제`}
              >
                &times;
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AddPhotos;
