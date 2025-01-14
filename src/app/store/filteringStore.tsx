import { create } from 'zustand';

interface IFilteringStore {
  confirmDesgin: string[] | null;
  confirmPrice: number | null;
  confirmReigon: string[] | null;

  setConfirmDesgin: (confirmDesgin: string[]) => void;
  setConfirmPrice: (confirmPrice: number) => void;
  setConfirmReigon: (confirmReigon: string[]) => void;
}

const useFilteringStore = create<IFilteringStore>((set) => ({
  confirmDesgin: null,
  confirmPrice: null,
  confirmReigon: null,
  setConfirmDesgin: (confirmDesgin) => set({ confirmDesgin }),
  setConfirmPrice: (confirmPrice) => set({ confirmPrice }),
  setConfirmReigon: (confirmReigon) => set({ confirmReigon }),
}));

export default useFilteringStore;
