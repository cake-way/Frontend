'use client';

import { useState } from 'react';
import Thumbnail from '@/app/components/log-entry/new-log/Thumbnail';
import AddPhotos from '@/app/components/log-entry/new-log/AddPhotos';

const NewLog = () => {
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null); // 대표 사진
  const [logTitle, setLogTitle] = useState(''); // 로그 제목
  const [logBody, setLogBody] = useState(''); // 본문 작성
  const [photos, setPhotos] = useState<File[]>([]); // 사진
  const [isPublic, setIsPublic] = useState(false); // 공개 여부

  // 임시 저장 버튼 클릭 핸들러
  const handleSaveDraft = () => {
    const draft = {
      thumbnailImage,
      logTitle,
      logBody,
      photos,
      isPublic,
    };
    console.log('임시 저장', draft);
  };

  // 작성 완료 버튼 클릭 핸들러
  const handleSubmit = () => {
    const payload = {
      thumbnailImage,
      logTitle,
      logBody,
      photos,
      isPublic,
    };

    // API 호출 (임시)
    fetch('/api/new-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('작성 완료:', data);
      })
      .catch((err) => {
        console.error('작성 실패:', err);
      });
  };

  const handleTogglePublic = () => {
    setIsPublic(!isPublic);
  };

  return (
    <main className="w-full flex flex-col items-center">
      {/* 상단 대표사진 */}
      <Thumbnail
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
        logTitle={logTitle}
        setLogTitle={setLogTitle}
      />

      {/* 전체 공개 토글 */}
      <header className="flex w-full items-center justify-end px-5 gap-2 mt-5">
        <p className="text-sm text-gray-700">전체 공개</p>
        <button
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 ${
            isPublic ? 'bg-primaryRed1' : 'bg-gray-400'
          }`}
          onClick={handleTogglePublic}
          aria-label={isPublic ? '전체 공개' : '비공개'}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
              isPublic ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></span>
        </button>
      </header>

      {/* 사진 첨부 영역 */}
      <AddPhotos photos={photos} setPhotos={setPhotos} />

      {/* 본문 작성 */}
      <section className="w-full px-5 mt-14">
        <p className="font-semibold">본문 작성</p>
        <textarea
          id="body"
          value={logBody}
          onChange={(e) => setLogBody(e.target.value)}
          placeholder="케이크와 함께한 경험과 정보를 자세하게 담아 다른 분들의 케이크 선택을 도와주세요!"
          className="w-full h-40 p-3 mt-3 text-[12px] border border-gray-300 rounded-[4px] resize-none outline-none caret-primaryRed1"
          aria-label="본문 입력란"
        />
      </section>

      {/* 버튼들: 임시 저장, 작성 완료 */}
      <div className="w-full flex justify-between px-5 mt-24 mb-11">
        <button
          className="w-[48%] py-2 text-gray-700 border border-gray-400 rounded-[4px]"
          onClick={handleSaveDraft}
        >
          임시 저장
        </button>
        <button
          className="w-[48%] py-2 text-white bg-black rounded-[4px]"
          onClick={handleSubmit}
        >
          작성 완료
        </button>
      </div>
    </main>
  );
};

export default NewLog;
