import React from 'react';

interface CakeCardProps {
  image: string;
  title: string;
  status: string;
  location: string;
}

const CakeCard: React.FC<CakeCardProps> = ({
  image,
  title,
  status,
  location,
}) => {
  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        당일 가능
      </div>
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
