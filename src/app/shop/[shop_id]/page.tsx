'use client';

import { useParams } from 'next/navigation';
import { cakeShops } from '../../../../constants/mockData';
import { useState } from 'react';
import Image from 'next/image';
import { getHoursMinutes } from '../../../../utils/utils';

const Shop = () => {
  const param = useParams();
  const [activeTab, setActiveTab] = useState('전체메뉴');
  const [subTab, setSubTab] = useState('');

  const getShopData = () => {
    return cakeShops.find((item) => item.shop_id === Number(param.shop_id));
  };

  const shop = getShopData();

  const tabs = [
    '생일',
    '졸업',
    '데이트',
    '파티',
    '연말',
    '결혼',
    '직장',
    '당일',
  ];

  const cakeLogs = [
    {
      id: 1,
      image: '/shop/log.png',
      price: '19,000원',
      name: '벨스데이 케이크',
      instagram: '@sarangbunny',
      date: '2024.01.01',
      description:
        '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이! 크고 맛있어서 엄청 아까워서 사진찍어서 남겨요...',
    },
    {
      id: 2,
      image: '/shop/log.png',
      price: '32,000원',
      name: '달월 홀 케이크',
      instagram: '@sarangbunny',
      date: '2024.01.01',
      description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
    },
    {
      id: 3,
      image: '/shop/log.png',
      price: '32,000원',
      name: '달월 홀 케이크',
      instagram: '@sarangbunny',
      date: '2024.01.01',
      description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
    },
    {
      id: 4,
      image: '/shop/log.png',
      price: '32,000원',
      name: '달월 홀 케이크',
      instagram: '@sarangbunny',
      date: '2024.01.01',
      description: '친구들과 새해 맞이 특별 케이크 ㅎㅎ 너무 예뻐 케이!',
    },
  ];

  if (!shop) {
    return <div>로딩중</div>;
  }

  const getRunTime = () => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const totalNowMinutes = nowHours * 60 + nowMinutes;
    const [hours, minutes] = getHoursMinutes(shop?.close_time);
    const totalMinutes = hours * 60 + minutes;

    return totalNowMinutes - totalMinutes;
  };

  return (
    <div className=" min-h-screen h-full mb-[var(--bottom-nav-height)]">
      <div
        className="h-[35%] bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/cake-1.svg')" }}
      ></div>
      <div className="h-[35%] relative">
        {/* 상단 정보 */}
        <div
          className=" border-[0.5px] border-solid border-[#EFEFEF]  flex flex-col items-center bg-[#ffffff] w-[88%] p-4 rounded-lg absolute left-[50%] -translate-x-[50%] -translate-y-[50%] "
          style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
        >
          <h1 className="text-[22px] font-bold">{shop?.name}</h1>
          <div className="mt-2 text-sm flex flex-col items-center">
            <p className="flex items-center text-grayscale700 text-xs font-bold">
              {`케이크 로그 ${shop?.scrap_count}개 |`}
              <span className="mr-2 flex">
                <Image
                  src="/shop/bookMark.svg"
                  width={16}
                  height={16}
                  alt="book_mark"
                />
                {shop?.scrap_count}
              </span>
            </p>
            <span className="text-xs m-5 text-grayscale900 bg-grayscale200 py-1 px-[10px] text-center rounded-[33px]">
              당일예약
            </span>
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
                {shop?.address}
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
                {getRunTime() > 0 ? '영업 중' : '마감'} 화 오전 11:30 -{' '}
                {shop.close_time}
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
                {shop?.contact}
              </p>
            </div>
          </div>
        </div>
        {/* 케이크로그작성, 인스타그램 */}
        <div className="absolute  flex gap-3 top-[55%] left-[50%] -translate-x-[50%]">
          <button
            className="whitespace-nowrap px-10 py-3 text-xs bg-[#ffffff] rounded   text-grayscale800 font-bold"
            style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
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
          <button
            className="whitespace-nowrap px-10 py-3 text-xs bg-[#ffffff] rounded   text-grayscale800 font-bold"
            style={{ boxShadow: '2px 2px 13px 0px rgba(0, 0, 0, 0.06)' }}
          >
            <Image
              width={24}
              height={24}
              src="/shop/instagram.svg"
              alt="cakelog_write_icon"
              className="mx-auto mb-2"
            />
            인스타그램
          </button>
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
        <div className="p-4">
          {/* 카테고리 탭 */}
          <div className="flex space-x-4 overflow-x-auto mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`
                    ${subTab === tab ? 'bg-grayscale800 text-[#f6f6f6]' : 'bg-grayscale100 text-[#131313]'}
                 font-medium px-4 py-1 rounded-full text-sm whitespace-nowrap`}
                onClick={() => setSubTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <h3 className="font-bold text-lg">{subTab}</h3>
          {/* 케이크 메뉴 그리드 */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-1 aspect-square ">
                <img
                  src="/images/cake-3.svg"
                  alt="케이크"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <p className="text-sm">벨스데이 케이크</p>
                <p className="text-xs">19,000원</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === '케이크로그' && (
        <div className="p-4 overflow-x-scroll flex gap-1 ">
          {cakeLogs.map((log) => (
            <div key={log.id} className="space-y-4 min-w-[60%]">
              <div className="relative">
                <img
                  src={log.image}
                  alt={log.name}
                  className="w-full h-full object-cover "
                />

                <div className="space-y-2 absolute z-50 bottom-0 ">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{log.instagram}</span>
                    <span className="text-gray-500">{log.date}</span>
                  </div>
                  <p className="text-sm">{log.description}</p>
                </div>
              </div>
              <h1>ㅁㄴㅇㄹㅁㄴ</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
