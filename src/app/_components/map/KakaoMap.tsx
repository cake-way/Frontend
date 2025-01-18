import Script from 'next/script';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

interface Coordinates {
  lat: number;
  lng: number;
}

interface IKakaoMap {
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  coordinates: Coordinates | null;
}

const KakaoMap = ({ mapRef, coordinates }: IKakaoMap) => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={coordinates || { lat: 37.5552, lng: 126.9368 }} // 기본 좌표 또는 현재 좌표
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
      >
        <MapMarker
          image={{
            src: '/map/mapMark.svg',
            size: { width: 24, height: 35 },
          }}
          position={{ lat: 37.5552, lng: 126.9368 }}
        ></MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
