'use client';
import useHomeLocationStore from '@/app/store/homeLocationStore';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MapShops } from 'types/relatedCake';

interface Coordinates {
  lat: number;
  lng: number;
}

interface IKakaoMap {
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  coordinates: Coordinates | null;
  shops: MapShops[] | null;
}

const KakaoMap = ({ mapRef, coordinates, shops }: IKakaoMap) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const { mapLocation } = useHomeLocationStore();

  useEffect(() => {
    // 카카오맵이 로드되었는지 확인
    if (window.kakao?.maps) {
      setIsMapReady(true);
    }
  }, []);

  if (!isMapReady) return null;

  return (
    <>
      <Map
        center={coordinates || mapLocation || { lat: 37.554, lng: 126.9368 }} // 기본 좌표 또는 현재 좌표
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
      >
        {shops &&
          shops.map((shop) => (
            <MapMarker
              key={shop.shopId}
              image={{
                src: '/map/mapMark.svg',
                size: { width: 24, height: 35 },
              }}
              position={{ lat: shop.latitude, lng: shop.longitude }}
            ></MapMarker>
          ))}
      </Map>
    </>
  );
};

export default KakaoMap;
