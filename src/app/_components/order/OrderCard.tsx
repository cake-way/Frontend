import Image from 'next/image';

const OrderCard = ({ order }: { order: (typeof orders)[number] }) => (
  <div className="flex items-center bg-white shadow rounded-lg overflow-hidden">
    <div className="relative w-24 h-24">
      <Image
        src={order.image}
        alt={order.store}
        fill
        className="object-cover"
      />
      <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {order.dDay}
      </div>
    </div>
    <div className="flex-1 p-4">
      <h2 className="text-sm font-bold text-gray-800">{order.store}</h2>
      <p className="text-xs text-gray-500 mt-1">{order.description}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span>{order.date}</span>
          <span>{order.time}</span>
        </div>
        <p className="text-sm font-bold text-gray-800">{order.price}</p>
      </div>
    </div>
    <button className="px-2 text-gray-500">&gt;</button>
  </div>
);

export default OrderCard;
