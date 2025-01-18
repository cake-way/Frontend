'use client';

import { useState } from 'react';
import Image from 'next/image';
import DropDownIcon from '../../../../../public/log-entry/dropdown.svg';

interface Category {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const CategorySelector = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategorySelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectCategory = (categoryId: number) => {
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
        {selectedCategoryId
          ? categories.find((cat) => cat.id === selectedCategoryId)?.name
          : '선택하기'}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Image src={DropDownIcon} alt="dropdown" />
        </span>
      </div>
      <div
        className={`absolute top-full left-5 w-11/12 bg-white border border-gray-300 rounded-b-[4px] z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          isDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          marginTop: '-1px',
        }}
      >
        <ul className="w-full">
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={`p-3 text-sm text-gray-700 cursor-pointer ${
                selectedCategoryId === category.id
                  ? 'bg-gray-200 font-semibold'
                  : ''
              } ${
                index < categories.length - 1 ? 'border-b border-gray-300' : ''
              } hover:bg-gray-100`}
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategorySelector;
