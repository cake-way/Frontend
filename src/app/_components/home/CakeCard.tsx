import Image from 'next/image';

interface CakeCardProps {
  image: string;
  title: string;
  status: string;
  location: string;
  sameDay: boolean;
}

const CakeCard: React.FC<CakeCardProps> = ({
  image,
  title,
  status,
  location,
  sameDay,
}) => {
  return (
    <div className="relative overflow-hidden min-w-[48%]">
      <div
        className="absolute bottom-0  w-full h-[50%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(117, 117, 117, 0.00) 0%,  rgba(15, 15, 15, 0.66) 100%)',
          backgroundBlendMode: 'multiply',
        }}
      ></div>
      <Image
        src={image}
        alt={title}
        width={0}
        height={0}
        className="w-full h-full object-cover"
      />

      {sameDay && (
        <div
          className="absolute top-2 right-2 border-[0.5px] border-solid border-[#fffff]  bg-opacity-60 text-white text-xs px-2.5 py-1 rounded-[21px]"
          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          당일 가능
        </div>
      )}
      <div className="p-4  absolute bottom-0 text-white">
        <h3 className="font-bold text-sm mb-1">{title}</h3>
        <div className="flex items-center text-xs ">
          <span
            className={`w-2 h-2 rounded-full mr-1 ${status === '영업 중' ? 'bg-green-500' : 'bg-red-500'}`}
          ></span>
          {status} {location}
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
