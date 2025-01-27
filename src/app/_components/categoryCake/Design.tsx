import useSelectedStore from '@/app/store/selectedStore';

export default function Design() {
  const { selectedDesign, setSelectedDesign } = useSelectedStore();
  const design = [
    '입체케이크',
    '캐릭터케이크',
    '리본케이크',
    '꽃케이크',
    '2단케이크',
    '레터링케이크',
    '이미지케이크',
    '기타',
  ];

  const onDesignClick = (key: string) => {
    if (selectedDesign.find((item) => item === key)) {
      setSelectedDesign((prev) => prev.filter((item) => item !== key));
      return;
    }
    if (selectedDesign.length >= 4) {
      alert('최대 4개까지 가능합니다.');
      return;
    }
    setSelectedDesign((pre: string[]) => [...pre, key]);
  };

  return (
    <>
      <div className="mb-4 p-4 flex items-center gap-3">
        <h4 className="text-lg font-bold ">디자인</h4>
        <p className="text-xs font-medium text-grayscale600">
          최대 <span className="text-primaryRed1 text-xs font-medium">4</span>개
          선택
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4">
        {design.map((item, index) => (
          <button
            key={index}
            onClick={() => onDesignClick(item)}
            className={` whitespace-nowrap  py-2 text-sm border text-grayscale700 rounded-md
                ${selectedDesign.find((name) => name === item) ? 'border-[#FA2840]  bg-[#FFEBEE]' : 'hover:bg-gray-200'}
                 `}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
