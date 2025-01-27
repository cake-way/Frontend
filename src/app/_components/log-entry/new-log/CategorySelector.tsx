'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DropDownIcon from '../../../../../public/log-entry/dropdown.svg';
import { getCategories } from '@/app/_lib/api/getCategories';

interface Category {
  categoryId: number;
  categoryName: string;
}

interface CategorySelectorProps {
  selectedShopId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const CategorySelector = ({
  selectedShopId,
  onSelectCategory,
}: CategorySelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedShopId !== null) {
      const fetchCategories = async () => {
        try {
          const response = await getCategories(selectedShopId);
          setCategories(response); // 카테고리 데이터 저장
        } catch (error) {
          console.error('카테고리 불러오기 실패:', error);
        }
      };

      fetchCategories();
    }
  }, [selectedShopId]); // 선택되는 가게가 바뀔 때마다 변경

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId); // 선택된 카테고리 ID 저장
    onSelectCategory(categoryId); // 부모 컴포넌트로 선택된 ID 전달
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <section className="w-full px-5 mt-5 mb-11 relative">
      <p className="font-semibold">케이크 카테고리</p>
      <div
        className={`w-full px-4 py-2 mt-3 text-sm border border-gray-300 cursor-pointer relative transition-all duration-300 ${
          isDropdownOpen ? 'rounded-t-[4px]' : 'rounded-[4px]'
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
      >
        {categories.length > 0
          ? categories.find((cat) => cat.categoryId === selectedCategoryId)
              ?.categoryName || '선택하기'
          : '선택하기'}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
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
            {categories.map((category, index) => (
              <li
                key={category.categoryId}
                className={`p-3 text-sm text-gray-700 cursor-pointer ${
                  selectedCategoryId === category.categoryId
                    ? 'bg-gray-200 font-semibold'
                    : ''
                } ${index < categories.length - 1 ? 'border-b border-gray-300' : ''} hover:bg-gray-100`}
                onClick={() => handleSelectCategory(category.categoryId)}
              >
                {category.categoryName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CategorySelector;
