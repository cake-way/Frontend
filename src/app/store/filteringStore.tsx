import { create } from 'zustand';

type priceObject = {
  min: number | undefined | null;
  max: number | null;
};
interface IFilteringStore {
  confirmDesgin: string[] | null;
  confirmPrice: priceObject | null;
  confirmReigon: string[] | null;

  setConfirmDesgin: (confirmDesgin: string[]) => void;
  setConfirmPrice: (confirmPrice: priceObject | null) => void;
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
