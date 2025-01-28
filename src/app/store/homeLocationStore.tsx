import { create } from 'zustand';

type mapLocation = {
  lat: number;
  lng: number;
};

interface IHomeLocationStore {
  homeLocation: null | string;
  mapLocation: null | mapLocation;
  currentLocationString: null | string;
  currentLocationLatLng: null | mapLocation;
  oneShopsLocation: mapLocation | null;
  setOneShopsLocation: (oneShopLocatio: mapLocation | null) => void;
  setMapLocation: (mapLocation: mapLocation) => void;
  setHomeLocation: (homeLocation: string) => void;
  setCurrentLocationString: (currentLocationString: string) => void;
  setCurrentLocationLatLng: (currentLocationLatLng: mapLocation) => void;
}

const useHomeLocationStore = create<IHomeLocationStore>((set) => ({
  homeLocation: null,
  mapLocation: null,
  currentLocationString: null,
  currentLocationLatLng: null,
  oneShopsLocation: null,
  setOneShopsLocation: (oneShopsLocation) => set({ oneShopsLocation }),
  setMapLocation: (mapLocation) => set({ mapLocation }),
  setHomeLocation: (homeLocation) => set({ homeLocation }),
  setCurrentLocationString: (currentLocationString) =>
    set({ currentLocationString }),
  setCurrentLocationLatLng: (currentLocationLatLng) =>
    set({ currentLocationLatLng }),
}));

export default useHomeLocationStore;
