import { PersistStorage } from 'zustand/middleware';
import { UserStoreState } from '@/app/store/userInfoStore';

const localStorageWrapper: PersistStorage<UserStoreState> = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null; // JSON으로 변환
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value)); // JSON으로 저장
  },
  removeItem: (name) => {
    localStorage.removeItem(name); // 삭제
  },
};

export default localStorageWrapper;
