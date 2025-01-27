import Image from 'next/image';
import FilledMarkIcon from '../../Icons/FilledMarkIcon';
import MarkIconDefault from '../../../../../public/my-log-images/mark.svg';
import {
  CakeDesignCardProps,
  CakeDesignGridProps,
} from 'types/cake-design/cakeDesignProps';

export const CakeDesignCard: React.FC<CakeDesignCardProps> = ({
  design,
  isMarked,
  onToggleMark,
  onClickDetail,
}) => (
  <div className="relative w-full h-[226px] overflow-hidden bg-gray-200">
    {/* 이미지 */}
    <Image
      src={design.imageUrl}
      alt={`design-${design.id}`}
      fill
      style={{ objectFit: 'cover' }}
      className="cursor-pointer"
      onClick={onClickDetail}
    />

    {/* 마크 토글 버튼 */}
    <button
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
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

export const CakeDesignGrid: React.FC<CakeDesignGridProps> = ({
  designs,
  marked,
  onToggleMark,
  onClickDetail,
}) => (
  <div className="grid grid-cols-2 gap-2 w-full p-4">
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
