import Image from 'next/image';
import FilledMarkIcon from '../../Icons/FilledMarkIcon';
import MarkIcon from '../../Icons/MarkIcon';
import StatusIcon from '../../../../../public/my-log-images/status.svg';
import { StoreItemProps } from 'types/store/storeItemProps';

const StoreItem: React.FC<StoreItemProps> = ({
  store,
  index,
  marked,
  onToggleScrap,
  onNavigate,
}) => {
  // 클릭 이벤트를 토글 버튼과 일반 클릭 이벤트로 구분
  const handleItemClick = (e: React.MouseEvent) => {
    // 클릭한 요소가 button이 아니면 상세페이지로 이동
    if (
      e.target !== e.currentTarget &&
      e.target !== e.currentTarget.querySelector('button')
    ) {
      onNavigate(store.shopId);
    }
  };

  return (
    <article
      className="flex items-center gap-4 relative cursor-pointer"
      onClick={handleItemClick} // 상세페이지 이동은 일반 클릭만 처리
    >
      <figure className="flex-shrink-0 w-[110px] h-[110px]  overflow-hidden">
        <Image
          src={store.shopImage}
          alt={`${store.shopImage}의 대표 이미지`}
          width={110}
          height={110}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="flex flex-col">
        {store.sameDay && (
          <span
            className={`px-[10px] py-[2px] mb-1 text-[12px] border rounded-full text-body2 w-fit ${
              store.sameDay
                ? 'bg-[#FFDDE2] text-primaryRed1 border-primaryRed2'
                : 'bg-red-200 text-red-800 border-red-500'
            }`}
          >
            당일예약
          </span>
        )}

        <h1 className="text-lg pl-0.5 font-bold text-black">
          {store.shopName}
        </h1>

        <section className="flex gap-1 text-sm font-semibold text-black mb-3">
          <Image src={StatusIcon} alt="상태 표시" />
          {store.operatingHours ? (
            <>
              영업 중{' '}
              {`${store.operatingHours.openTime
                .split(':')
                .slice(0, 2)
                .join(':')} ~ ${store.operatingHours.closeTime
                .split(':')
                .slice(0, 2)
                .join(':')}`}
            </>
          ) : (
            <span>오늘 휴무</span>
          )}
        </section>

        <p className="text-sm text-black">{store.address}</p>
      </div>

      <aside
        style={{
          position: 'absolute',
          right: 0,
          top: '25%',
        }}
      >
        {/* 토글 버튼 클릭 시 상세 페이지로 이동하지 않게 하기 위해 e.stopPropagation 사용 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            onToggleScrap(index, store.shopId);
          }}
        >
          {marked[index] ? <FilledMarkIcon fill="#292929" /> : <MarkIcon />}
        </button>
      </aside>
    </article>
  );
};

export default StoreItem;
