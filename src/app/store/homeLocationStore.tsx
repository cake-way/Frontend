import { MapShops } from 'types/relatedCake';
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
  oneShops: MapShops[] | null;
  setOneShops: (
    callback: (pre: MapShops[] | null) => MapShops[] | null
  ) => void;
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
  oneShops: null,
  setOneShops: (callback) =>
    set((state) => ({
      oneShops: callback(state.oneShops),
    })),
  setMapLocation: (mapLocation) => set({ mapLocation }),
  setHomeLocation: (homeLocation) => set({ homeLocation }),
  setCurrentLocationString: (currentLocationString) =>
    set({ currentLocationString }),
  setCurrentLocationLatLng: (currentLocationLatLng) =>
    set({ currentLocationLatLng }),
}));

export default useHomeLocationStore;
