'use client';

import { useState } from 'react';
import SearchIcon from './Icons/SearchIcon';

interface InputFieldProps {
  placeholder?: string;
  map?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, map }) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  return (
    <form className="flex justify-center items-center w-full" role="search">
      <label
        htmlFor="search-input"
        className={`${map ? 'w-full bg-[#ffffff] shadow' : 'w-full bg-[#F4F4F4]'} flex items-center gap-[10px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px]`}
      >
        {/* 아이콘 */}
        <div className="flex-shrink flex items-center">
          <SearchIcon focus={focus} />
        </div>

        {/* 입력 필드 */}
        <input
          onBlur={handleBlur}
          onFocus={handleFocus}
          id="search-input"
          type="text"
          placeholder={placeholder}
          className={`${map ? 'placeholder-gray-500' : 'placeholder-gray-400'} flex-grow flex-shrink text-[14px] text-[#131313] outline-none bg-transparent`}
          aria-label="검색어 입력"
        />
      </label>
    </form>
  );
};

export default InputField;
