'use client';

import Image from 'next/image';
import back from '../../../../public/header-images/back-white.svg';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import { useQuery } from '@tanstack/react-query';
import cakeDetailApi from '@/app/_lib/cakeDetail';
import { ICakeDetail } from 'types/relatedCake';
import { getShopAdress } from '@/app/_lib/shopApi';

export default function CakeDetail() {
  const router = useRouter();
  const { cake_id } = useParams();

  const onClickedOrder = () => {
    router.push(`/order/${cake_id}`);
  };

  const onclickedBack = () => {
    router.back();
  };

  if (!cake_id || Array.isArray(cake_id)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">존재하지 않는 케이크입니다.</h1>
        <button
          className="mt-4 p-2 bg-black text-white rounded"
          onClick={() => router.push('/home')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const { data } = useQuery<ICakeDetail>({
    queryKey: ['cakeDetail', cake_id],
    queryFn: () => cakeDetailApi(+cake_id),
  });
  const { data: shopDetail } = useQuery({
    queryKey: ['shopDetail', data?.shopId],
    queryFn: () => getShopAdress(data?.shopId),
    enabled: !!data?.shopId, // shopId가 존재할 때만 쿼리 실행
  });

  if (data) {
    return (
      <div className="w-full  mx-auto">
        <Header
          leftButtonImage={<Image src={back} alt="back" />}
          centerText="예약하기"
          onLeftButtonClick={onclickedBack}
          backgroundTransparent={true}
        ></Header>
        {/* 상단 케이크 이미지 */}
        <div className="relative w-full h-72">
          <Image
            src={data?.imageUrl}
            alt="케이크 이미지"
            fill
            className="object-cover aspect-square"
          />
        </div>

        {/* 케이크 상세 정보 */}
        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">{data?.cakeName}</h1>
            <p className="  heading-1 mr-5">{data?.price.toLocaleString()}원</p>
          </div>
          <p className="text-sm font-medium text-grayscale800 ">
            케이크 로그 {data?.cakeLogCount}개
          </p>
          <div className="mt-3.5 ">
            <div>
              <div className="flex gap-1">
                <Image
                  src="/shop/positionIcon.svg"
                  alt="position_icon"
                  width={24}
                  height={24}
                />
                <p
                  className="text-base font-semibold text-grayscale900 cursor-pointer"
                  onClick={() => router.push(`/shop/${data.shopId}`)}
                >
                  {data?.shopName}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm text-grayscale700 font-medium">
                  {shopDetail?.address}
                </p>
                <button className="text-sm font-medium text-grayscale600">
                  지도보기
                </button>
              </div>
            </div>
          </div>
          <button
            className="w-full bg-grayscale900 text-white py-2 rounded-[22px] mt-[26px]"
            onClick={onClickedOrder}
          >
            예약하기
          </button>
        </div>

        {/* 다른 디자인 */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">다른 디자인</h2>
          <div className="flex gap-[5px] overflow-x-auto no-scrollbar">
            {data?.otherCakes && data.otherCakes.length > 0 ? (
              <>
                {data.otherCakes.map((design) => (
                  <div
                    className="cursor-pointer"
                    key={design.cakeId}
                    onClick={() => router.push(`/cakeDetail/${design.cakeId}`)}
                  >
                    <div className="relative  h-40 overflow-hidden aspect-square">
                      <Image
                        src={design.imageUrl}
                        alt={design.name}
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover s"
                      />
                    </div>
                    <p className="mt-[2px] text-sm font-medium">
                      {design.name}
                    </p>
                    <p className="text-xs font-medium ">
                      {design.price.toLocaleString()}원
                    </p>
                  </div>
                ))}
              </>
            ) : (
              // 다른 디자인이 없을 경우
              <div className="text-center text-gray-500 text-sm py-5">
                준비중입니다.
              </div>
            )}
          </div>
        </div>

        {/* 케이크 로그 */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">케이크 로그</h2>
          <div className="flex gap-[5px] overflow-x-auto no-scrollbar">
            {data?.cakeLogs && data.cakeLogs.length > 0 ? (
              // 케이크 로그가 존재하는 경우
              data.cakeLogs.map((log) => (
                <div
                  key={log.cakelogId || log.title}
                  className="relative"
                  onClick={() => router.push(`/log-detail/${log.cakelogId}`)}
                >
                  <div className=" relative w-auto h-56 aspect-[3/4] ">
                    <div
                      className="z-20 absolute bottom-0  w-full h-[50%]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(117, 117, 117, 0.00) 0%,  rgba(15, 15, 15, 0.66) 100%)',
                        backgroundBlendMode: 'multiply',
                      }}
                    ></div>
                    <Image
                      src={log.thumbnailImage || '/default-image.jpg'}
                      alt={log.title || '케이크 로그'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-grayscale100 left-3 z-20 absolute bottom-8 mt-[2px] text-sm font-medium">
                    {log.title || '제목 없음'}
                  </p>
                  <p className="z-20 text-sm absolute left-3 bottom-4 text-grayscale100">
                    @{log.cakelogId || 'ID 없음'}
                  </p>
                </div>
              ))
            ) : (
              // 케이크 로그가 없을 경우
              <div className="text-center text-gray-500 text-sm py-5">
                작성된 케이크 로그가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
