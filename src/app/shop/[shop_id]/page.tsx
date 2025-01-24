'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import shopDetailApi, { shopLogApi } from '@/app/_lib/shopApi';
import { IShopDetail, shopLogs } from 'types/relatedCake';
import Link from 'next/link';
import LoadingSpinner from '@/app/_components/Loading';

const Shop = () => {
  const { shop_id } = useParams();
  const [activeTab, setActiveTab] = useState('전체메뉴');
  const [subTab, setSubTab] = useState<string | null>(null);
  const router = useRouter();

  if (!shop_id || Array.isArray(shop_id)) {
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

  const { data: shopDetail, isLoading } = useQuery<IShopDetail>({
    queryKey: ['shopDetail', shop_id, subTab],
    queryFn: () => shopDetailApi(+shop_id, subTab),
  });
  const tabs = shopDetail?.cakes?.cakeCategoryResponseDtos?.map(
    (item) => item.categoryName
  );
  const { data: shopLogs, isLoading: shopLogsLoading } = useQuery<shopLogs>({
    queryKey: ['shopLogs', shop_id],
    queryFn: () => shopLogApi(shop_id),
  });
  // const { data: shopCategory } = useQuery({
  //   queryKey: ['shopCategory', shop_id],
  //   queryFn: () => shopCategoryApi(shop_id),
  // });

  // const getShopData = () => {
  //   return cakeShops.find((item) => item.shop_id === Number(shop_id));
  // };

  // const shop = getShopData();

  // const tabs = [
  //   '생일',
  //   '졸업',
  //   '데이트',
  //   '파티',
  //   '연말',
  //   '결혼',
  //   '직장',
  //   '당일',
  // ];

  // const cakeLogs = [
  //   {
  //     id: 1,
  //     image: '/shop/log.png',
  //     price: '19,000원',
  //     name: '벨스데이 케이크',
  //     instagram: '@sarangbunny',
  //     date: '2024.01.01',
  //     description:
  //       '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이! 크고 맛있어서 엄청 아까워서 사진찍어서 남겨요...',
  //   },
  //   {
  //     id: 2,
  //     image: '/shop/log.png',
  //     price: '32,000원',
  //     name: '달월 홀 케이크',
  //     instagram: '@sarangbunny',
  //     date: '2024.01.01',
  //     description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
  //   },
  //   {
  //     id: 3,
  //     image: '/shop/log.png',
  //     price: '32,000원',
  //     name: '달월 홀 케이크',
  //     instagram: '@sarangbunny',
  //     date: '2024.01.01',
  //     description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
  //   },
  //   {
  //     id: 4,
  //     image: '/shop/log.png',
  //     price: '32,000원',
  //     name: '달월 홀 케이크',
  //     instagram: '@sarangbunny',
  //     date: '2024.01.01',
  //     description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
  //   },
  // ];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const getRunTime = () => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const totalNowMinutes = nowHours * 60 + nowMinutes;
    const hour = shopDetail?.operatingHour?.closeTime?.hour;
    const minutes = shopDetail?.operatingHour?.closeTime?.minute;

    const totalMinutes = hour! * 60 + minutes!; //

    return totalNowMinutes - totalMinutes;
  };
  const onClickedSubTap = (tab: string) => {
    if (tab === subTab) {
      setSubTab('');
      return;
    }
    setSubTab(tab);
  };

  return (
    <div className=" min-h-screen h-full mb-[var(--bottom-nav-height)]">
      <div
        className="h-[35%] bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/home/cake-1.svg')" }}
      ></div>
      <div className="h-[35%] relative">
        {/* 상단 정보 */}
        <div
          className=" border-[0.5px] border-solid border-[#EFEFEF]  flex flex-col items-center bg-[#ffffff] w-[88%] p-4 rounded-lg absolute left-[50%] -translate-x-[50%] -translate-y-[50%] "
          style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
        >
          <h1 className="text-[22px] font-bold">{shopDetail?.name}</h1>
          <div className="mt-2 text-sm flex flex-col items-center">
            <p className="flex items-center text-grayscale700 text-xs font-bold">
              {`케이크 로그 ${shopDetail?.scrapCount}개 |`}
              <span className="mr-2 flex">
                <Image
                  src="/shop/bookMark.svg"
                  width={16}
                  height={16}
                  alt="book_mark"
                />
                {shopDetail?.scrapCount}
              </span>
            </p>
            {shopDetail?.sameDay && (
              <span className="text-xs m-5 text-grayscale900 bg-grayscale200 py-1 px-[10px] text-center rounded-[33px]">
                당일예약
              </span>
            )}
            <div className="flex flex-col gap-[2px]">
              <p className="flex items-center text-gray-600">
                <span className="mr-2">
                  <Image
                    src="/shop/positionIcon.svg"
                    width={20}
                    height={20}
                    alt="adress_icon"
                  />
                </span>
                {shopDetail?.address}
                <span className="text-grayscale600 ml-2 text-sm whitespace-nowrap align-text-top">
                  지도보기
                </span>
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">
                  <Image
                    src="/shop/clock.svg"
                    width={20}
                    height={20}
                    alt="runtime_icon"
                  />
                </span>
                {getRunTime() > 0 ? '영업 중' : '마감'}{' '}
                {shopDetail?.operatingHour?.dayOfWeek}
                {shopDetail?.operatingHour?.openTime?.hour !== undefined &&
                  (shopDetail.operatingHour.openTime.hour <= 11
                    ? '오전'
                    : '오후')}
                {shopDetail?.operatingHour?.openTime?.hour}:
                {shopDetail?.operatingHour?.openTime?.minute} -&nbsp;
                {shopDetail?.operatingHour?.closeTime?.hour}:
                {shopDetail?.operatingHour?.openTime?.minute
                  .toString()
                  .padStart(2, '0')}
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">
                  <Image
                    src="/shop/insta.svg"
                    width={20}
                    height={20}
                    alt="instagram_link_icon"
                  />
                </span>
                {shopDetail?.contact}
              </p>
            </div>
          </div>
        </div>
        {/* 케이크로그작성, 인스타그램 */}
        <div className="absolute  flex gap-3 top-[55%] left-[50%] -translate-x-[50%]">
          <button
            className="whitespace-nowrap px-10 py-3 text-xs bg-[#ffffff] rounded   text-grayscale800 font-bold"
            style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
            onClick={() => router.push('/log-entry/new-log')}
          >
            <Image
              width={28}
              height={22}
              src="/shop/cakeLog_write.svg"
              alt="cakelog_write_icon"
              className="mx-auto mb-2"
            />
            케이크 로그 작성
          </button>
          <Link
            className="whitespace-nowrap px-10 py-3 text-xs bg-[#ffffff] rounded   text-grayscale800 font-bold"
            style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
            href={shopDetail?.instagram || ''}
          >
            <Image
              width={24}
              height={24}
              src="/shop/instagram.svg"
              alt="cakelog_write_icon"
              className="mx-auto mb-2"
            />
            인스타그램
          </Link>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b">
        <div className="flex space-x-7 px-4 justify-center">
          <button
            className={`${activeTab === '전체메뉴' ? 'text-grayscale900 border-b-2 border-black' : 'text-grayscale500'} text-base font-bold pb-2`}
            onClick={() => setActiveTab('전체메뉴')}
          >
            전체 메뉴
          </button>
          <button
            className={`${activeTab === '케이크로그' ? 'text-grayscale900 border-b-2 border-black' : 'text-grayscale500'} text-base font-bold pb-2`}
            onClick={() => setActiveTab('케이크로그')}
          >
            케이크 로그
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      {activeTab === '전체메뉴' && (
        <div className="p-4 pb-[var(--bottom-nav-height)]">
          {/* 카테고리 탭 */}
          <div className="flex space-x-4 overflow-x-auto mb-4">
            {tabs?.map((tab) => (
              <button
                key={tab}
                className={`
                    ${subTab === tab ? 'bg-grayscale800 text-[#f6f6f6]' : 'bg-grayscale100 text-[#131313]'}
                 font-medium px-4 py-1 rounded-full text-sm whitespace-nowrap`}
                onClick={() => onClickedSubTap(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <h3 className="font-bold text-lg">{subTab}</h3>
          {/* 케이크 메뉴 그리드 */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {shopDetail?.cakes?.cakes?.map((item) => (
              <div key={item.cakeId} className="space-y-1 aspect-square ">
                <Image
                  src={item.thumnailUrl}
                  alt={item.cakeName}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <p className="text-sm">{item.cakeName}</p>
                <p className="text-xs">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === '케이크로그' && (
        <>
          {shopLogsLoading ? (
            <LoadingSpinner />
          ) : (
            <div className=" pb-[var(--bottom-nav-height)]">
              <div className="px-5 py-7 overflow-x-scroll flex gap-1">
                {shopLogs?.cakelogs?.map((log) => (
                  <div key={log.id} className="space-y-4 min-w-[60%]">
                    <div className="relative">
                      <img
                        src={log.thumbnail_image}
                        alt={log.title}
                        className="w-full h-full object-cover "
                      />

                      <div className="space-y-2 absolute z-50 bottom-0 ">
                        <div className="flex items-center mb-3.5 ml-4 justify-between flex-col text-grayscale100">
                          <span className="font-medium">{log.title}</span>
                          <span className="text-xs font-semibold">
                            {log.instagram}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-1.5 bg-grayscale100 w-full"></div>
              {/* 하단 케이크 로그 상세 */}
              <div className="px-5 gap-1 ">
                {shopLogs?.cakelogs?.map((log) => (
                  <div key={log.id} className="border-b pb-[18px]">
                    <div className="flex gap-2.5 items-center my-[18px]">
                      <h1 className="text-sm font-medium text-grayscale900">
                        {log.title}
                      </h1>
                      <span className="text-xs text-[#949494] align-middle">
                        {log.instagram}
                      </span>
                    </div>
                    <div className="flex gap-3.5">
                      <Image
                        src={log.thumbnail_image}
                        alt={log.title}
                        width={73}
                        height={95}
                      />
                      <div className="text-xs text-grayscale800 flex flex-col justify-between">
                        <span>{log.body}</span>
                        <span>주문일 {log.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
