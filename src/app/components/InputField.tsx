import Image from 'next/image';
import React from 'react';

import SearchIcon from '../../../public/Header/search.svg';

interface InputFieldProps {
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="flex flex-row items-center gap-[10px] w-[330px] h-[37px] p-[8px] px-4 shrink-0 rounded-[20px] bg-[#F4F4F4]">
        <Image src={SearchIcon} alt="돋보기 아이콘" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full text-[14px] text-[#131313] placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default InputField;
