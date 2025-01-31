'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DropDownIcon from '../../../../../public/log-entry/dropdown.svg';
import { getCategories } from '@/app/_lib/api/getCategories';
import { Category, CategorySelectorProps } from 'types/cake-log/createLog';

const CategorySelector = ({
  selectedShopId,
  onSelectCategory,
}: CategorySelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // 상위 컴포넌트에서 selectedShopId가 없을 때는 아예 렌더링하지 않도록 처리
  if (selectedShopId === null) {
    return null;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(selectedShopId);
        setCategories(response);
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [selectedShopId]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    onSelectCategory(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <section className="w-full px-5 mt-12 mb-11 relative">
      <p className="font-semibold">케이크 카테고리</p>
      <div
        className={`w-full px-4 py-2 mt-3 text-sm border border-grayscale300 cursor-pointer relative transition-all duration-300 ${
          isDropdownOpen ? 'rounded-t-[4px]' : 'rounded-[4px]'
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
      >
        {selectedCategoryId !== null
          ? categories.find((cat) => cat.categoryId === selectedCategoryId)
              ?.categoryName || '선택하기'
          : '카테고리를 선택해주세요'}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-grayscale700">
          <Image src={DropDownIcon} alt="dropdown" />
        </span>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute top-full left-5 right-5 bg-white border border-gray-300 rounded-b-[4px] z-10 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            marginTop: '-1px',
          }}
        >
          <ul className="max-h-60 overflow-y-auto">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li
                  key={category.categoryId}
                  className={`p-3 text-sm text-grayscale700 cursor-pointer ${
                    selectedCategoryId === category.categoryId
                      ? 'text-black'
                      : ''
                  } ${
                    index < categories.length - 1
                      ? 'border-b border-grayscale500'
                      : ''
                  } hover:bg-gray-100`}
                  onClick={() => handleSelectCategory(category.categoryId)}
                >
                  {category.categoryName}
                </li>
              ))
            ) : (
              <li className="p-3 text-sm text-grayscale700">
                카테고리가 없습니다.
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CategorySelector;
