import CakeCard from './CakeCard';

const cakes = [
  {
    image: '/home/cake-1.svg',
    title: '베니케이크',
    status: '오늘 휴무',
    location: '서울/마포',
    sameDay: false,
  },
  {
    image: '/home/cake-2.svg',
    title: '커피 벌스데이',
    status: '영업 중',
    location: '서울/마포',
    sameDay: true,
  },
  {
    image: '/home/cake-3.svg',
    title: '씨케이크',
    status: '영업 중',
    location: '서울/마포',
    sameDay: true,
  },
  {
    image: '/home/cake-4.svg',
    title: 'TAND CAKE',
    status: '오늘 휴무',
    location: '서울/강남',
    sameDay: true,
  },
  {
    image: '/home/cake-4.svg',
    title: 'TAND CAKE',
    status: '오늘 휴무',
    location: '서울/강남',
    sameDay: false,
  },
];

const CakeRecommend: React.FC = () => {
  return (
    <section className="py-4  px-5 bg-lightGray w-full">
      <div className=" mx-auto  w-full flex flex-col gap-14">
        {/* 1번 슬라이드 */}
        <div>
          <h2 className="title-2 mb-4">특별한 날, 특별한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {cakes.map((cake, index) => (
              <CakeCard
                key={index}
                image={cake.image}
                title={cake.title}
                status={cake.status}
                location={cake.location}
                sameDay={cake.sameDay}
              />
            ))}
          </div>
        </div>

        {/* 2번슬라이드 */}
        <div>
          <h2 className="title-2 mb-4">특별한 날, 특별한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {cakes.map((cake, index) => (
              <CakeCard
                key={index}
                image={cake.image}
                title={cake.title}
                status={cake.status}
                location={cake.location}
                sameDay={cake.sameDay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeRecommend;
