'use client';
import Header from '../_components/Header';
import CakeWay from '../../../public/header-images/cake-way.svg';
import Alarm from '../../../public/header-images/alarm.svg';
import Image from 'next/image';
import InputField from '../_components/InputField';
import CakePick from '../_components/home/CakePick';
import CategoryCake from '../_components/home/CategoryCake';
import CakeRecommend from '../_components/home/CakeRecommend';
import { useState } from 'react';
import CurrentPosition from '../_components/home/CurrentPosition';
import useHomeLocationStore from '../store/homeLocationStore';
import { useEffect } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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

  //로딩중인 현재위치 나타내기!!!!!!!

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
  };

  return (
    <>
      <Header
        leftButtonImage={<Image src={CakeWay} alt="Cake Way" />}
        centerComponent={
          <InputField placeholder=" 원하는 케이크 찾으러 가기" />
        }
        rightButtonImage={[<Image key="Alarm" src={Alarm} alt="Alarm" />]}
      />

      <CakePick />
      <CategoryCake />
      <div className="my-7  h-2 bg-[#f4f4f4]"></div>

      {/* 위치설정 */}
      <div
        className="flex gap-1.5 px-5 cursor-pointer"
        onClick={clickedCurrentPosition}
      >
        <Image
          src={'/shop/positionIcon.svg'}
          alt="position_icon"
          width={16}
          height={16}
        />
        <div className="text-[#4f4f4f] text-sm font-medium">{homeLocation}</div>
        <Image
          src={'/order/arrow_down.svg'}
          alt="position_icon"
          width={14}
          height={14}
          className={` transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>
      <CakeRecommend />
      {isOpen && (
        <CurrentPosition
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          afterLoadedKakao={afterLoadedKakao}
        />
      )}
    </>
  );
}
