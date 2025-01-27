import useSelectedStore from '@/app/store/selectedStore';
import { useState } from 'react';

export default function Reigon() {
  const [selectedRegions, setSelectedRegions] = useState<string>('서울'); // 선택된 지역 상태
  const maxSelection = 3; // 최대 선택 가능 개수
  const { selectedSub, setSelectedSub } = useSelectedStore();

  const regions = ['서울'];
  const subRegions: Record<string, string[]> = {
    서울: ['신촌/이대', '상수/합정/망원'],
  };

  console.log(selectedSub);

  const handleRegionClick = (region: string) => {
    if (selectedRegions == region) {
      setSelectedRegions('');
      return;
    }
    setSelectedRegions(region);
  };

  const handleSubClick = (subRegion: string) => {
    if (selectedSub.includes(subRegion)) {
      setSelectedSub((pre) => pre.filter((item) => item !== subRegion));
      return;
    }
    setSelectedSub((pre) => [...pre, subRegion]);
  };

  return (
    <div className=" w-full mx-auto rounded-lg">
      {/* Title */}
      <div className="flex items-center gap-3 p-4">
        <h2 className="text-lg font-bold">지역별</h2>
        <p className="text-sm text-gray-500">
          최대 <span className="text-red-500 font-bold">{maxSelection}</span>개
          선택
        </p>
      </div>

      {/* Main Regions */}
      <div className=" px-4 grid grid-cols-4 gap-2 mb-4">
        {regions.map((region, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              selectedRegions.includes(region)
                ? 'bg-[#3A3A3A] text-white border'
                : 'text-[#000000] hover:bg-gray-200'
            }`}
            onClick={() => handleRegionClick(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="bg-[#F4F4F4] w-full h-[6px] mb-5 "></div>

      {/* Sub Regions */}
      <div className="grid grid-cols-3 gap-2 px-4">
        {subRegions[selectedRegions]?.map((subRegion, index) => (
          <button
            key={index}
            className={`py-2 px-3 text-sm font-medium border rounded-md text-gray-700
                
                ${
                  selectedSub.includes(subRegion)
                    ? 'border-[#FA2840]  bg-[#FFEBEE] '
                    : 'border-grayscale300 hover:bg-gray-200'
                }
                `}
            onClick={() => handleSubClick(subRegion)}
          >
            {subRegion}
          </button>
        ))}
      </div>
    </div>
  );
}
