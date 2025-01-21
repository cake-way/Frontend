import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OrderType {
  id: number;
  image: string;
  store: string;
  description: string;
  date: string;
  time: string;
  price: number;
  dDay: string;
}

interface OrderCardProps {
  order: OrderType;
  orderList?: boolean;
  detail?: boolean;
}

const OrderCard = ({ order, orderList, detail = false }: OrderCardProps) => {
  const router = useRouter();

  return (
    <div
      className="w-full border h-[154px] flex"
      style={
        !detail
          ? { boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.10)' }
          : undefined
      }
    >
      <div className="flex flex-1  gap-2 px-2 py-2.5">
        {/* 이미지 섹션 */}
        <div className="relative  flex-1 h-auto bg-[#E7363F]">
          <div className="absolute inset-0 p-2">
            <div className="relative w-full h-full">
              <Image
                src={order.image}
                alt={order.description}
                fill
                className="object-cover"
              />
              {orderList && (
                <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {order.dDay}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 텍스트 섹션 */}
        <div className="flex-1 pt-2.5 border solid flex flex-col">
          <div className="border-b  flex-[2] solid  px-2.5">
            <h3 className="font-semibold ">{order.store}</h3>
            <p className="text-grayscale900 text-xs font-medium mb-2">
              {order.description}
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
              {order.date} {order.time}
            </span>
          </div>
          <div className="py-1.5 flex-[2] flex justify-between  border-t px-2.5">
            <p className=" flex items-center  text-sm font-bold">
              {order.price}원
            </p>
            <Image
              src={'/order/arrow_right.svg'}
              alt="arrow-right-icon"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => router.push(`/orderList/detail/${order.id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
