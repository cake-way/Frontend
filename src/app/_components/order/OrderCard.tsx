import { days } from 'constants/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { OrderCardProps } from 'types/relatedCake';

const OrderCard = ({
  order,
  orderList,
  detail = false,
  cakeSearch,
}: OrderCardProps) => {
  const router = useRouter();
  const getDday = () => {
    const interval = new Date(order.pickupDate).getTime() - Date.now();
    return Math.ceil(interval / (1000 * 60 * 60 * 24));
  };

  const cakeDetail = cakeSearch?.find((item) => item.name === order.cakeName);

  const cardColor = getDday() <= 3 ? '#E7363F' : '#C8C400';
  const pickupDate = new Date(
    new Date(order.pickupDate).getTime() + 9 * 60 * 60 * 1000
  );

  return (
    <div
      className="w-full border min-h-[154px] flex"
      style={
        !detail
          ? { boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.10)' }
          : undefined
      }
    >
      <div className="flex flex-1  gap-2 px-2 py-2.5">
        {/* 이미지 섹션 */}

        <div
          className={`relative flex-1 min-w-[141px] h-auto  inset-0 p-2 ${
            getDday() <= 3 ? 'bg-[#E7363F]' : 'bg-[#C8C400]'
          }`}
        >
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8 absolute z-30"
              preserveAspectRatio="none"
            >
              <path d="M0 0 L100 0 L0 100 Z" fill={`${cardColor}`} />
            </svg>
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8 absolute bottom-0 right-0 z-30"
              preserveAspectRatio="none"
            >
              <path d="M100 0 L100 100 L0 100 Z" fill={`${cardColor}`} />
            </svg>
            <Image
              src={order.imageUrl || cakeDetail?.imageUrl || 'home/cake.svg'}
              //여기 왜이러지?ㅜ
              alt={order.cakeName}
              fill
              className="object-cover object-center"
            />
            {orderList && (
              <div className="absolute top-2 right-1.5 border text-white text-[10px] px-2  rounded-full">
                D-{getDday()}
              </div>
            )}
          </div>
        </div>

        {/* 텍스트 섹션 */}
        <div className="flex-1 pt-2.5 border solid  aspect-square flex flex-col">
          <div className="border-b  flex-[2] solid  px-2.5">
            <h3 className="font-semibold ">
              {order.cakeShopName || cakeDetail?.cakeShopName}
            </h3>
            <p className="text-grayscale900 text-xs font-medium mb-2">
              {order.cakeName}&nbsp;
              {order.size}
              <br />
              {order.color}
            </p>
          </div>

          <div className="flex  flex-1 items-center gap-2 px-2.5 py-1.5">
            <Image
              src={'/order/calendar.svg'}
              alt="calendar-icon"
              width={17}
              height={17}
            />
            <span className=" text-grayscale900 text-xs font-medium">
              {pickupDate.getMonth() + 1}.{pickupDate.getDate()}
              &nbsp;({days[new Date().getDay()]})&nbsp;&nbsp;
              {pickupDate.getHours() <= 11 ? '오전' : '오후'}
              &nbsp;
              {pickupDate.getHours() - 9}:
              {pickupDate.getMinutes().toString().padStart(2, '0')}
            </span>
          </div>
          <div className="py-1.5 flex-[2] flex justify-between  border-t px-2.5">
            <p className=" flex items-center  text-sm font-bold">
              {order.totalPrice.toLocaleString()}원
            </p>
            {!detail && orderList && (
              <Image
                src={'/order/arrow_right.svg'}
                alt="arrow-right-icon"
                width={16}
                height={16}
                className="cursor-pointer "
                onClick={() =>
                  router.push(`/orderList/detail/${order.orderId}`)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
