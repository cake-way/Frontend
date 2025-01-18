export interface Pagination {
  current: number; // 현재 페이지 번호
  last: number; // 마지막 페이지 번호
  gotoPage: (page: number) => void; // 특정 페이지로 이동하는 함수
}

export interface Kakao {
  maps: {
    services: {
      Status: {
        OK: 'OK';
        ZERO_RESULT: 'ZERO_RESULT';
        ERROR: 'ERROR';
      };
      Places: new () => {
        keywordSearch: (
          keyword: string,
          callback: (data: Place[], status: KakaoMapStatus) => void
        ) => void;
      };
    };
    load: (callback: () => void) => void;
  };
}

export interface Place {
  id: string;
  place_name: string;
  address_name: string;
  x: string; // 경도
  y: string; // 위도
}

export type KakaoMapStatus = 'OK' | 'ERROR' | 'ZERO_RESULT';
