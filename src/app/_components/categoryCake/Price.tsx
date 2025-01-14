import useSelectedStore from '@/app/store/selectedStore';

export default function Price() {
  //   const [priceRange, setPriceRange] = useState(4); // 초기값 설정
  const { selectedPrice, setSelectedPrice } = useSelectedStore();

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value <= 1) {
      value = 2;
      setSelectedPrice(value);
      return;
    }
    setSelectedPrice(value);
  };

  const handleButtonClick = (value: number) => {
    setSelectedPrice(value);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-lg font-bold ">가격</h4>
      </div>

      {/* 가격 범위 표시 */}
      <div className=" mb-4">
        <p className="text-lg font-bold text-center">0원-{selectedPrice}만원</p>
      </div>

      {/* 슬라이더 */}
      <div className="relative w-full h-1 my-8">
        {/* 배경&가격 트랙 */}
        <div className="absolute w-full  right-0 h-[3px] bg-grayscale300 rounded"></div>
        <div className="absolute top-5 text-xs font-medium text-grayscale600">
          0원
        </div>
        {selectedPrice !== 10 ? (
          <div className="absolute top-5  right-0 text-xs font-medium text-grayscale600">
            10만원
          </div>
        ) : null}
        {
          <div
            className={`absolute top-5 text-xs font-medium text-grayscale800 
            ${selectedPrice === 10 ? '-translate-x-8 text-nowrap' : '-translate-x-1/2'}
            `}
            style={{
              left: `${(selectedPrice / 10) * 100}%`, // 슬라이더와 동일 위치
            }}
          >
            {selectedPrice}만원
          </div>
        }

        {/* 선택된 범위 표시 */}
        <div
          className="absolute h-1  right-0 bg-primaryRed1 "
          style={{
            left: '3px',
            right: `${100 - (selectedPrice / 10) * 100}%`,
          }}
        ></div>

        {/* 최소값 슬라이더 */}
        <input
          aria-label="min"
          type="range"
          min="0"
          max="0"
          value={0}
          onChange={(e) => handleRangeChange(e)}
          className="absolute w-full appearance-none bg-transparent cursor-pointer
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4
               [&::-webkit-slider-thumb]:rounded-full
               [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:-translate-y-1
                
                    [&::-webkit-slider-thumb]:border-solid
                [&::-webkit-slider-thumb]:border-[1px]
               [&::-webkit-slider-thumb]:border-primaryRed1
               [&::-webkit-slider-thumb]:shadow
               [&::-moz-range-thumb]:w-4
               [&::-moz-range-thumb]:h-4
               [&::-moz-range-thumb]:rounded-full
               [&::-moz-range-thumb]:bg-blue-500
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
          value={selectedPrice}
          onChange={(e) => handleRangeChange(e)}
          className="absolute w-full appearance-none bg-transparent cursor-pointer
          
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4
               [&::-webkit-slider-thumb]:rounded-full
           
              [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:-translate-y-1
            
                    [&::-webkit-slider-thumb]:border-solid
               [&::-webkit-slider-thumb]:border-[1px]
               [&::-webkit-slider-thumb]:border-primaryRed1
               [&::-webkit-slider-thumb]:shadow
               [&::-moz-range-thumb]:w-4
               [&::-moz-range-thumb]:h-4
               [&::-moz-range-thumb]:rounded-full
               [&::-moz-range-thumb]:bg-blue-500
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
              selectedPrice === i + 2
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
