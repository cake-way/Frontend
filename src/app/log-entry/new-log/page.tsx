'use client';

import { useState } from 'react';

import ThumbnailImage from '@/app/_components/log-entry/new-log/Thumbnail';
import AddPhotos from '@/app/_components/log-entry/new-log/AddPhotos';
import CategorySelector from '@/app/_components/log-entry/new-log/CategorySelector';
import LocationSearch from '@/app/_components/log-entry/new-log/LocationSearch';

import useUserStore from '@/app/store/userInfoStore';
import { useRouter } from 'next/navigation';

const NewLog = () => {
  const { userInfo } = useUserStore(); // 현재 사용자 정보 가져오기

  const [thumbnailImage, setThumbnailImage] = useState<string | File | null>(
    null
  ); // 대표 사진
  const [logTitle, setLogTitle] = useState(''); // 로그 제목
  const [logBody, setLogBody] = useState(''); // 본문 작성
  const [photos, setPhotos] = useState<File[]>([]); // 등록된 사진들
  const [isPublic, setIsPublic] = useState(false); // 공개 여부
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  ); // 선택된 카테고리 ID
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // 말풍선 모달 표시 여부

  const [selectedShopId, setSelectedShopId] = useState<number | null>(null); // shopId 상태 관리

  const router = useRouter();

  const handleTogglePublic = () => {
    const nextPublicState = !isPublic; // 다음 상태 미리 계산
    setIsPublic(nextPublicState);

    if (nextPublicState) {
      // 전체 공개로 변경될 때만 말풍선 모달 표시
      setIsTooltipVisible(true);
    }
  };

  const handleCloseTooltip = () => {
    setIsTooltipVisible(false); // 말풍선 모달 닫기
  };
  const handleSubmit = async () => {
    if (!selectedCategoryId) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    const formData = new FormData();

    // 텍스트 데이터 추가
    formData.append('categoryId', String(selectedCategoryId));
    formData.append('title', logTitle);
    formData.append('body', logBody);
    formData.append('isPublic', JSON.stringify(isPublic));

    // 대표 이미지 추가
    if (thumbnailImage) {
      formData.append('thumbnailImage', thumbnailImage); // File 객체를 직접 추가
    } else {
      alert('대표 이미지를 선택해주세요.');
      return;
    }

    // 이미지 리스트 추가
    photos.forEach((photo) => {
      formData.append('imageList', photo);
    });

    // FormData 전송
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cakelog`,
        {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('작성 완료:', data);
        router.back();
      } else {
        console.error('작성 실패:', await response.text());
      }
    } catch (error) {
      console.error('작성 중 에러 발생:', error);
    }
  };

  // LocationSearch에서 shopId가 선택되면 호출되는 함수
  const handleShopSelect = (shopId: number) => {
    setSelectedShopId(shopId); // 선택된 shopId를 상태로 저장
  };

  // 공통 클래스 정의
  const commonButtonClass =
    'w-[48%] py-2 rounded-[4px] transition-all duration-300 focus:outline-none';

  return (
    <main className="w-full flex flex-col items-center">
      {/* 상단 대표사진 */}
      <ThumbnailImage
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
        logTitle={logTitle}
        setLogTitle={setLogTitle}
        username={userInfo?.username || ''}
        userProfileImage={userInfo?.profileImage || ''}
      />

      {/* 전체 공개 토글 */}
      <header className="flex w-full items-center justify-end px-5 gap-2 mt-5 mb-3 relative">
        <p className="text-sm text-grayscale800">전체 공개</p>
        <button
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 ${
            isPublic ? 'bg-primaryRed1' : 'bg-grayscale400'
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
        {isTooltipVisible && (
          <aside className="absolute top-full right-0 mt-2 px-2 py-[6px] bg-black text-white text-xs rounded-[4px] shadow-lg flex items-center justify-between w-60 z-10">
            <div className="absolute top-[-4px] right-9 w-2 h-2 bg-black rotate-45"></div>
            <p>전체 공개 시 홈 화면에 노출될 수 있습니다.</p>
            <button
              onClick={handleCloseTooltip}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="닫기"
            >
              ✕
            </button>
          </aside>
        )}
      </header>

      {/* 위치 검색 */}

      <LocationSearch onShopSelect={handleShopSelect} />

      {/* 카테고리 선택 */}
      <CategorySelector
        selectedShopId={selectedShopId}
        onSelectCategory={setSelectedCategoryId}
      />

      {/* 사진 첨부 */}
      <AddPhotos photos={photos} setPhotos={setPhotos} />

      {/* 본문 작성 */}
      <section className="w-full px-5 mt-14">
        <p className="font-semibold">본문 작성</p>
        <textarea
          id="body"
          value={logBody}
          onChange={(e) => setLogBody(e.target.value)}
          placeholder="케이크와 함께한 경험과 정보를 자세하게 담아 다른 분들의 케이크 선택을 도와주세요!"
          className="w-full px-5 h-40 p-3 mt-3 text-[12px] border border-grayscale500 rounded-[4px] resize-none outline-none caret-primaryRed1"
          aria-label="본문 입력란"
        />
      </section>
      {/* 버튼들 */}
      <footer className="w-full flex justify-between px-5 mt-16 mb-11">
        <button
          className={`${commonButtonClass} text-grayscale700 border border-grayscale400`}
        >
          임시 저장
        </button>
        <button
          className={`${commonButtonClass} text-white bg-black`}
          onClick={handleSubmit}
        >
          작성 완료
        </button>
      </footer>
    </main>
  );
};

export default NewLog;
