import { create } from 'zustand';

type mapLocation = {
  lat: number;
  lng: number;
};

interface IHomeLocationStore {
  homeLocation: null | string;
  mapLocation: null | mapLocation;
  setMapLocation: (mapLocation: mapLocation) => void;
  setHomeLocation: (homeLocation: string) => void;
}

const useHomeLocationStore = create<IHomeLocationStore>((set) => ({
  homeLocation: null,
  mapLocation: null,
  setMapLocation: (mapLocation) => set({ mapLocation }),
  setHomeLocation: (homeLocation) => set({ homeLocation }),
}));

export default useHomeLocationStore;
