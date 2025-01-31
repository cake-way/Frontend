import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import localStorageWrapper from 'utils/customStorage';

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
  isHydrated: boolean; // Hydration 여부
  setUserInfo: (data: {
    userInfo: UserInfo;
    designScrap: ScrapItem[];
    storeScrap: StoreScrap[];
    logScrap: LogScrap[];
  }) => void;
  clearUserInfo: () => void;
  setHydrated: () => void; // Hydration 완료 상태 설정
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      userInfo: null,
      designScrap: [],
      storeScrap: [],
      logScrap: [],
      isHydrated: false, // 기본값 false
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
      setHydrated: () => set({ isHydrated: true }), // Hydration 완료
    }),
    {
      name: 'user-storage', // 로컬 스토리지 키
      storage: localStorageWrapper,
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(); // Hydration 완료 상태 설정
      },
    }
  )
);

export default useUserStore;
