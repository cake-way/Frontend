import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.5552, lng: 126.9368 }}
        style={{ width: '100%', height: '100%' }}
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
