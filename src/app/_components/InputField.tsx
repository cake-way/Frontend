'use client';

import { useState } from 'react';
import SearchIcon from './Icons/SearchIcon';

interface InputFieldProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 변화 시 호출
  onSubmit?: (keyword: string) => void; // 폼 제출 시 호출
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChange = () => {},
  onSubmit = () => {},
}) => {
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState(''); // 검색어 상태 관리

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // 내부 상태 업데이트
    onChange(e); // 부모 컴포넌트의 onChange 호출
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSubmit(keyword); // 검색어 전달
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full"
      role="search"
      onSubmit={handleSubmit} // 폼 제출 핸들러 연결
    >
      <label
        htmlFor="search-input"
        className="bg-[#F4F4F4] flex items-center gap-[10px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px] w-full"
      >
        {/* 아이콘 크기 조정 */}
        <div className="flex-shrink-0 flex items-center w-[20px] sm:w-[24px] md:w-[28px]">
          <SearchIcon focus={focus} />
        </div>

        {/* 입력 필드 */}
        <input
          id="search-input"
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-auto sm:w-[80%] md:w-[70%] text-[14px] text-[#131313] outline-none bg-transparent caret-primaryRed1"
          aria-label="검색어 입력"
        />
      </label>
    </form>
  );
};

export default InputField;
