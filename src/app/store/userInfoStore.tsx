import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import localStorageWrapper from 'utils/customStorage';

// 사용자 정보 타입 정의
interface UserInfo {
  memberId: number;
  username: string;
  profileImage: string;
  description: string;
}

interface ScrapItem {
  cakeId: number;
  cakeImage: string;
}

interface StoreScrap {
  storeId: number;
  storeImage: string;
  storeName: string;
  address: string;
  operatingHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    active: boolean;
  };
  sameDay: boolean;
}

interface LogScrap {
  logId: number;
  title: string;
  logImage: string;
}

export interface UserStoreState {
  userInfo: UserInfo | null;
  designScrap: ScrapItem[];
  storeScrap: StoreScrap[];
  logScrap: LogScrap[];
  setUserInfo: (data: {
    userInfo: UserInfo;
    designScrap: ScrapItem[];
    storeScrap: StoreScrap[];
    logScrap: LogScrap[];
  }) => void;
  clearUserInfo: () => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      userInfo: null,
      designScrap: [],
      storeScrap: [],
      logScrap: [],
      setUserInfo: (data) =>
        set({
          userInfo: data.userInfo,
          designScrap: data.designScrap,
          storeScrap: data.storeScrap,
          logScrap: data.logScrap,
        }),
      clearUserInfo: () =>
        set({
          userInfo: null,
          designScrap: [],
          storeScrap: [],
          logScrap: [],
        }),
    }),
    {
      name: 'user-storage', // 로컬 스토리지 키
      storage: localStorageWrapper,
    }
  )
);

export default useUserStore;
