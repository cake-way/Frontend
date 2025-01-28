import Image from 'next/image';
import FilledMarkIcon from '../../Icons/FilledMarkIcon';
import MarkIconDefault from '../../../../../public/my-log-images/mark.svg';
import {
  CakeDesignCardProps,
  CakeDesignGridProps,
} from 'types/cake-design/cakeDesignProps';
import { useEffect, useState } from 'react';

export const CakeDesignCard: React.FC<CakeDesignCardProps> = ({
  design,
  isMarked,
  onToggleMark,
  onClickDetail,
}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    // 이미지 로드 시 실제 비율 계산
    const img = new window.Image();
    img.src = design.imageUrl;
    img.onload = () => {
      setAspectRatio(img.height / img.width);
    };
  }, [design.imageUrl]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        gridRowEnd: `span ${Math.ceil(aspectRatio * 12)}`,
      }}
    >
      <div
        className="w-full h-full"
        style={{ paddingBottom: `${aspectRatio * 100}%` }}
      >
        <Image
          src={design.imageUrl}
          alt={`design-${design.id}`}
          fill
          style={{ objectFit: 'cover' }}
          className="cursor-pointer absolute top-0 left-0"
          onClick={onClickDetail}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleMark();
        }}
        className="absolute top-2 right-2 z-10"
      >
        {isMarked ? (
          <FilledMarkIcon />
        ) : (
          <Image src={MarkIconDefault} alt="Mark" />
        )}
      </button>
    </div>
  );
};

export const CakeDesignGrid: React.FC<CakeDesignGridProps> = ({
  designs,
  marked,
  onToggleMark,
  onClickDetail,
}) => (
  <div
    className="grid gap-2 w-full p-4"
    style={{
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridAutoRows: '20px',
    }}
  >
    {designs.map((design, index) => (
      <CakeDesignCard
        key={design.id}
        design={design}
        isMarked={marked[index]}
        onToggleMark={() => onToggleMark(index, design.id)}
        onClickDetail={() => onClickDetail(design.id)}
      />
    ))}
  </div>
);
