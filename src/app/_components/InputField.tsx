'use client';

import { useState } from 'react';
import SearchIcon from './Icons/SearchIcon';

interface InputFieldProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이벤트 객체를 받도록 수정
  onSubmit?: (keyword: string) => void; // keyword를 전달할 수 있도록 추가
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
    setKeyword(e.target.value);
    onChange(e); // 부모 컴포넌트에서 받은 onChange 호출
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
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="search-input"
        className="w-full bg-[#F4F4F4] flex items-center gap-[10px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px]"
      >
        <div className="flex-shrink flex items-center">
          <SearchIcon focus={focus} />
        </div>

        <input
          onBlur={handleBlur}
          onFocus={handleFocus}
          id="search-input"
          type="text"
          placeholder={placeholder}
          value={keyword} // 검색어 상태 반영
          onChange={handleChange}
          className="flex-grow flex-shrink text-[14px] text-[#131313] outline-none bg-transparent placeholder-gray-400 caret-primaryRed1"
          aria-label="검색어 입력"
        />
      </label>
    </form>
  );
};

export default InputField;
