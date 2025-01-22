import { useState } from 'react';
import Price from './Price';
import Design from './Design';
import Reigon from './Reigon';
import useFilteringStore from '@/app/store/filteringStore';
import useSelectedStore from '@/app/store/selectedStore';

interface BottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  initName: string;
}

export default function BottomSheet({
  isOpen,
  setIsOpen,
  initName,
}: BottomSheetProps) {
  const closeBottomSheet = () => setIsOpen(false);
  const [filterName, setFilterName] = useState(initName); // 초기값은 빈 문자열
  const { setConfirmDesgin, setConfirmPrice, setConfirmReigon } =
    useFilteringStore();
  const { selectedDesign, selectedSub, selectedMaxPrice, selectedMinPrice } =
    useSelectedStore();

  const onClickedResult = () => {
    setConfirmDesgin(selectedDesign);
    setConfirmPrice({ max: selectedMaxPrice, min: selectedMinPrice });
    setConfirmReigon(selectedSub);
    setIsOpen(false);
  };

  return (
    <div className="w-full  max-w-[480px] ">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[51] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeBottomSheet}
      ></div>

      {/* Bottom Sheet */}
      <div
        className={`fixed mx-auto h-[80vh] bottom-0 left-0 right-0  w-full max-w-[480px] bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 z-[51] ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-around items-center px-4 pt-3 border-b">
          <p
            className={`pb-[11px] cursor-pointer ${
              filterName === '지역'
                ? 'border-b-2 font-bold border-[#000000]'
                : 'font-medium text-grayscale600'
            }`}
            onClick={() => setFilterName('지역')}
          >
            지역
          </p>
          <p
            className={`pb-[11px] cursor-pointer ${
              filterName === '가격'
                ? 'border-b-2 font-bold border-[#000000]'
                : 'font-medium text-grayscale600'
            }`}
            onClick={() => setFilterName('가격')}
          >
            가격
          </p>
          <p
            className={`pb-[11px] cursor-pointer ${
              filterName === '디자인'
                ? 'border-b-2 font-bold border-[#000000]'
                : 'font-medium text-grayscale600'
            }`}
            onClick={() => setFilterName('디자인')}
          >
            디자인
          </p>
        </div>

        {/* Content */}
        <div className=" box-border   overflow-hidden ">
          {filterName === '디자인' && <Design />}
          {filterName === '가격' && <Price />}
          {filterName === '지역' && <Reigon />}

          {/* 하단 버튼 */}
          <div className=" box-border fixed w-full px-4 bottom-3 mt-6 flex space-x-2">
            <button
              className="flex-1 py-2 text-sm bg-gray-200 rounded-md"
              onClick={closeBottomSheet}
            >
              닫기
            </button>
            <button
              className="flex-1 py-2 text-sm bg-black text-white rounded-md"
              onClick={onClickedResult}
            >
              결과 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
