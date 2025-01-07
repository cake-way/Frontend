import CakeCard from './CakeCard';

const cakes = [
  {
    image: '/images/cake-1.svg',
    title: '베니케이크',
    status: '오늘 휴무',
    location: '서울/마포',
  },
  {
    image: '/images/cake-2.svg',
    title: '커피 벌스데이',
    status: '영업 중',
    location: '서울/마포',
  },
  {
    image: '/images/cake-3.svg',
    title: '씨케이크',
    status: '영업 중',
    location: '서울/마포',
  },
  {
    image: '/images/cake-4.svg',
    title: 'TAND CAKE',
    status: '오늘 휴무',
    location: '서울/강남',
  },
];

const CakeRecommend: React.FC = () => {
  return (
    <section className="py-8 bg-lightGray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="title-2">특별한 날, 특별한 케이크</h2>
          <a href="#" className="text-grayscale800 text-xs">
            전체보기 &gt;
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          {cakes.map((cake, index) => (
            <CakeCard
              key={index}
              image={cake.image}
              title={cake.title}
              status={cake.status}
              location={cake.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeRecommend;
