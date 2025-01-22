import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[]; // 드롭다운 옵션 배열
  selectedValue: string; // 현재 선택된 값
  onChange: (value: string) => void; // 값 변경 시 호출될 함수
  label: string; // 드롭다운 레이블
}

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-2">
      <h2 className="text-lg font-bold">{label}</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-left border border-gray-300  "
        >
          <span className="text-base text-gray-700">{selectedValue}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              d="M9.5 14.7777L16.0452 8.40937C16.2679 8.1927 16.624 8.19757 16.8407 8.42025C17.0573 8.64292 17.0524 8.99902 16.8298 9.21562L9.89225 15.9656C9.67393 16.1781 9.32608 16.1781 9.10775 15.9656L2.17025 9.21562C1.94757 8.99902 1.9427 8.64292 2.15937 8.42025C2.37597 8.19757 2.73208 8.1927 2.95475 8.40937L9.5 14.7777Z"
              fill="#B4B4B4"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full  bg-white border-x border-b border-gray-300  shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`w-full px-4 py-2.5 text-left hover:bg-gray-100
                  ${selectedValue === option ? 'bg-red-50 text-gray-900' : 'text-gray-700'}
                  ${options[0] === option ? 'rounded-t-md' : ''}
                  ${options[options.length - 1] === option ? 'rounded-b-md' : ''}
                `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
