import useSelectedStore from '@/app/store/selectedStore';

export default function Price() {
  //   const [priceRange, setPriceRange] = useState(4); // 초기값 설정
  const {
    selectedMaxPrice,
    setSelectedMaxPrice,
    selectedMinPrice,
    setSelectedMinPrice,
  } = useSelectedStore();

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);

    if (value <= min) {
      value = min + 1; // 최댓값이 최솟값보다 작지 않도록 제한
    }
    setSelectedMaxPrice(value);
  };
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);

    if (value >= max) {
      value = max - 1; // 최솟값이 최댓값을 넘지 않도록 제한
    }
    setSelectedMinPrice(value);
  };

  const handleButtonClick = (value: number) => {
    setSelectedMaxPrice(value);
  };

  const max = selectedMaxPrice ?? 10; //null 연산자
  const min = selectedMinPrice ?? 0;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-lg font-bold ">가격</h4>
      </div>

      {/* 가격 범위 표시 */}
      <div className=" mb-4">
        <p className="text-lg font-bold text-center">
          {min}만원-{max}만원
        </p>
      </div>

      {/* 슬라이더 */}
      <div className="relative w-full h-1 my-8">
        {/* 배경&가격 트랙 */}
        <div className="absolute w-full  right-0 h-[3px] bg-grayscale300 rounded"></div>
        <div className="absolute left-0 w-[2px] h-[10px] bg-[#D9D9D9] top-0 -translate-y-[calc(50%-2px)]"></div>
        <div className="absolute left-[25%] w-[2px] h-[10px] bg-[#D9D9D9] top-0 -translate-y-[calc(50%-2px)]"></div>
        <div className="absolute left-[50%] w-[2px] h-[10px] bg-[#D9D9D9] top-0 -translate-y-[calc(50%-2px)]"></div>
        <div className="absolute left-[75%] w-[2px] h-[10px] bg-[#D9D9D9] top-0 -translate-y-[calc(50%-2px)]"></div>
        <div className="absolute left-[100%] w-[2px] h-[10px] bg-[#D9D9D9] top-0 -translate-y-[calc(50%-2px)]"></div>
        <div className="absolute top-5 text-xs font-medium text-grayscale600">
          0원
        </div>
        {max !== 10 ? (
          <div className="absolute top-5  right-0 text-xs font-medium text-grayscale600">
            10만원
          </div>
        ) : null}
        {
          <div
            className={`absolute top-5 text-xs font-medium text-grayscale800 
            ${max === 10 ? '-translate-x-8 text-nowrap' : '-translate-x-1/2'}
            `}
            style={{
              left: `${(max / 10) * 100}%`, // 슬라이더와 동일 위치
            }}
          >
            {max}만원
          </div>
        }

        {/* 선택된 범위 표시 */}
        <div
          className="absolute h-1  right-0 bg-primaryRed1 "
          style={{
            left: `${(min / 10) * 100}%`,
            right: `${100 - (max / 10) * 100}%`,
          }}
        ></div>

        {/* 최소값 슬라이더 */}
        <input
          aria-label="min"
          type="range"
          min="0"
          max="10"
          value={min}
          onChange={(e) => handleMinChange(e)}
          className="z-20 absolute w-full appearance-none bg-transparent cursor-pointer
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4
               [&::-webkit-slider-thumb]:rounded-full
               [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:-translate-y-[6px]
                
                    [&::-webkit-slider-thumb]:border-solid
                [&::-webkit-slider-thumb]:border-[2px]
               [&::-webkit-slider-thumb]:border-primaryRed1
               [&::-webkit-slider-thumb]:shadow
               [&::-moz-range-thumb]:w-4
               [&::-moz-range-thumb]:h-4
               [&::-moz-range-thumb]:rounded-full
              
               [&::-moz-range-thumb]:border-2
               [&::-moz-range-thumb]:border-white
               [&::-moz-range-thumb]:shadow"
        />

        {/* 최대값 슬라이더 */}
        <input
          aria-label="max"
          type="range"
          min="0"
          max="10"
          value={max}
          onChange={(e) => handleMaxChange(e)}
          className="z-20 absolute w-full appearance-none bg-transparent cursor-pointer
          
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4
               [&::-webkit-slider-thumb]:rounded-full
           
              [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:-translate-y-[6px]
            
                    [&::-webkit-slider-thumb]:border-solid
               [&::-webkit-slider-thumb]:border-[2px]
               [&::-webkit-slider-thumb]:border-primaryRed1
               [&::-webkit-slider-thumb]:shadow
               [&::-moz-range-thumb]:w-4
               [&::-moz-range-thumb]:h-4
               [&::-moz-range-thumb]:rounded-full
               [&::-moz-range-thumb]:border-2
               [&::-moz-range-thumb]:border-white
               [&::-moz-range-thumb]:shadow"
        />
      </div>

      {/* 금액 버튼 */}
      <div className="grid grid-cols-3 gap-2 mt-10">
        {[...Array(9)].map((_, i) => (
          <button
            onClick={() => handleButtonClick(i + 2)}
            key={i}
            className={`text-sm py-2 border  text-grayscale700 rounded-md ${
              max === i + 2
                ? 'border-[#FA2840]  bg-[#FFEBEE] '
                : 'border-grayscale300 hover:bg-gray-200'
            }`}
          >
            {i + 2}만원 이하
          </button>
        ))}
      </div>
    </div>
  );
}
