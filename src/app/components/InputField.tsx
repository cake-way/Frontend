import React from 'react';

interface InputFieldProps {
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      {' '}
      {/* 부모 div가 화면 중앙으로 배치 */}
      <div className="flex flex-col items-center gap-[10px] w-[267.031px] h-[37px] p-[8px] px-[10px] shrink-0 rounded-[20px] bg-[#F4F4F4]">
        <input
          type="text"
          placeholder={placeholder || 'Enter text...'}
          className="w-full text-sm text-[#131313] placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default InputField;
