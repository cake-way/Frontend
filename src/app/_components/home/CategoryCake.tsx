import Image from 'next/image';
import Link from 'next/link';
import { getCategoryParam } from '../../../../constants/constants';

const CategoryCake = () => {
  const categories: { label: keyof typeof getCategoryParam; icon: string }[] = [
    { label: '생일', icon: '/home/icons/birthday.svg' },
    { label: '졸업', icon: '/home/icons/graduate.svg' },
    { label: '데이트', icon: '/home/icons/date.svg' },
    { label: '파티', icon: '/home/icons/party.svg' },
    { label: '연말', icon: '/home/icons/yearend.svg' },
    { label: '기념일', icon: '/home/icons/anniversary.svg' },
    { label: '감사', icon: '/home/icons/thanks.svg' },
    { label: '결혼', icon: '/home/icons/marry.svg' },
    { label: '직장', icon: '/home/icons/work.svg' },
    { label: '당일', icon: '/home/icons/now.svg' },
  ];

  return (
    <div className="grid grid-cols-5 gap-y-4 mt-8  px-3">
      {categories.map((item, index) => (
        <Link
          href={`/categorySearch/${getCategoryParam[item.label]}`}
          key={index}
          className="flex flex-col items-center"
        >
          <div className="aspect-square flex item-center">
            <Image
              src={item.icon}
              alt={item.label}
              width={23}
              height={23}
              className="w-9 h-9"
            ></Image>
          </div>
          <span className="text-sm text-gray-600 mt-2">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCake;
