import CakeCard from './CakeCard';
import { HomeRecommend } from 'types/relatedCake';
import { useRouter } from 'next/navigation';

interface ICakeRecommend {
  data: HomeRecommend;
}

const CakeRecommend = ({ data }: ICakeRecommend) => {
  const router = useRouter();
  const special = data.special;
  const trendy = data.trendy;

  return (
    <section className="py-4  px-5 bg-lightGray w-full">
      <div className=" mx-auto  w-full flex flex-col gap-14">
        {/* 1번 슬라이드 */}
        <div>
          <h2 className="title-2 mb-4">특별한 날, 특별한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full  ">
            {special.map((cake) => (
              <div
                className="cursor-pointer"
                key={cake.shopId}
                onClick={() => router.push(`/shop/${cake.shopId}`)}
              >
                <CakeCard
                  key={cake.shopId}
                  image={cake.shopImg}
                  title={cake.shopName}
                  operatingHours={cake.operatingHours}
                  location={cake.region}
                  sameDay={cake.sameDay}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2번슬라이드 */}
        <div>
          <h2 className="title-2 mb-4">지금 가장 트렌디한 케이크</h2>

          <div className="flex overflow-x-auto gap-4 w-full h-full ">
            {trendy.map((cake) => (
              <div
                className="cursor-pointer w-full h-full"
                key={cake.shopId}
                onClick={() => router.push(`/shop/${cake.shopId}`)}
              >
                <CakeCard
                  key={cake.shopId}
                  image={cake.shopImg}
                  title={cake.shopName}
                  operatingHours={cake.operatingHours}
                  location={cake.region}
                  sameDay={cake.sameDay}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeRecommend;
