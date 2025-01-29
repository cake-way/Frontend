'use client';
import Header from '../_components/Header';
import CakeWay from '../../../public/header-images/cake-way.svg';
import Alarm from '../../../public/header-images/alarm-fill.svg';
import Image from 'next/image';
import InputField from '../_components/home/InputField';
import CakePick from '../_components/home/CakePick';
import CategoryCake from '../_components/home/CategoryCake';
import CakeRecommend from '../_components/home/CakeRecommend';
import { useState } from 'react';
import CurrentPosition from '../_components/home/CurrentPosition';
import useHomeLocationStore from '../store/homeLocationStore';
import { useEffect } from 'react';
import SearchResults from '../_components/home/SearchResults';
import { useQuery } from '@tanstack/react-query';
import { homeRecommendApi } from '../_lib/homeApi';
import { HomeRecommend } from 'types/relatedCake';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data } = useQuery<HomeRecommend>({
    queryKey: ['recommend'],
    queryFn: () => homeRecommendApi(),
  });

  const clickedCurrentPosition = () => {
    setIsOpen(true);
  };
  const {
    currentLocationLatLng,
    currentLocationString,
    homeLocation,
    mapLocation,
    setHomeLocation,
    setMapLocation,
    setCurrentLocationLatLng,
    setCurrentLocationString,
  } = useHomeLocationStore();

  //카카오맵 로드
  useEffect(() => {
    if (window.kakao?.maps) {
      // autoload=false 때문에 필요한 초기화 과정
      window.kakao.maps.load(() => {
        afterLoadedKakao();
      });
    }

    const script = document.querySelector('script[src*="dapi.kakao.com"]');
    if (script) {
      script.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          afterLoadedKakao();
        });
      });
    }
  }, []);
  //현재위치 설정
  const afterLoadedKakao = (clicked?: boolean) => {
    if (clicked) {
      if (currentLocationLatLng && currentLocationString) {
        setHomeLocation(currentLocationString);
        setMapLocation(currentLocationLatLng);
        return;
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setMapLocation({
            lat: position.coords.latitude - 0.0012,
            lng: position.coords.longitude,
          });
          setCurrentLocationLatLng({
            lat: position.coords.latitude - 0.0012,
            lng: position.coords.longitude,
          });

          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.coord2Address(
            position.coords.longitude,
            position.coords.latitude,
            (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                setHomeLocation(result[0].address.address_name);
                setCurrentLocationString(result[0].address.address_name);
              }
            }
          );
        });

        return;
      }
    }
    if (!homeLocation && !mapLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapLocation({
          lat: position.coords.latitude - 0.0012,
          lng: position.coords.longitude,
        });
        setCurrentLocationLatLng({
          lat: position.coords.latitude - 0.0012,
          lng: position.coords.longitude,
        });

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          position.coords.longitude,
          position.coords.latitude,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setHomeLocation(result[0].address.address_name);
              setCurrentLocationString(result[0].address.address_name);
            }
          }
        );
      });
    }
    useHomeLocationStore.setState({ oneShopsLocation: null });
  };

  return (
    <>
      <Header
        leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
        centerComponent={
          <InputField
            placeholder="원하는 케이크 찾으러 가기"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchKeyword(e.target.value)
            }
          />
        }
        rightButtonImage={[
          <Image key="Alarm" src={Alarm} width={24} height={24} alt="Alarm" />,
        ]}
      />
      {searchKeyword ? (
        <div className="absolute top-15 left-0 w-full bg-white z-10 min-h-screen">
          {currentLocationLatLng?.lat && currentLocationLatLng?.lng && (
            <SearchResults
              keyword={searchKeyword}
              latitude={mapLocation?.lat}
              longitude={mapLocation?.lng}
            />
          )}
        </div>
      ) : (
        <>
          {data?.curationList && <CakePick curationList={data.curationList} />}

          <CategoryCake />
          <div className="my-7 h-2 bg-[#f4f4f4]"></div>
          <div
            className="flex gap-1.5 px-5 cursor-pointer"
            onClick={clickedCurrentPosition}
          >
            <Image
              src={'/shop/positionIcon.svg'}
              alt="position_icon"
              width={20}
              height={20}
            />
            <div className="text-[#4f4f4f] text-sm font-medium">
              {homeLocation ? homeLocation : '위치를 선택해주세요'}
            </div>
            <Image
              src={'/order/arrow_down.svg'}
              alt="position_icon"
              width={14}
              height={14}
              className={` transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
          {data && <CakeRecommend data={data} />}
          {isOpen && (
            <CurrentPosition
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              afterLoadedKakao={afterLoadedKakao}
            />
          )}
        </>
      )}
    </>
  );
}
