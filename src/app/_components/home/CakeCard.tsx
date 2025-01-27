import Image from 'next/image';

interface CakeCardProps {
  image: string;
  title: string;
  operatingHours: {
    dayOfWeek: string;
    openTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    closeTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    active: boolean;
  };
  location: string;
  sameDay: boolean;
}

const CakeCard: React.FC<CakeCardProps> = ({
  image,
  title,
  operatingHours,
  location,
  sameDay,
}) => {
  const getRunTime = () => {
    const date = new Date();
    const hours = operatingHours.openTime.hour * 60;
    const minutes = operatingHours.openTime.minute;

    const start = hours + minutes;

    const endHours = operatingHours.closeTime.hour * 60;
    const endMinutes = operatingHours.closeTime.minute;

    const end = endHours + endMinutes;
    if (start === 0 && end === 0) {
      return true; // 24시간 영업
    }

    const now = date.getHours() * 60 + date.getMinutes();

    return start < now && now < end;
  };
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
        width={400}
        height={400}
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
            className={`w-2 h-2 rounded-full mr-1 ${getRunTime() === true ? 'bg-green-500' : 'bg-red-500'}`}
          ></span>
          {getRunTime()} {location}
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
