import { create } from 'zustand';

type priceObject = {
  min: number | undefined;
  max: number | undefined;
};
interface IFilteringStore {
  confirmDesgin: string[] | undefined;
  confirmPrice: priceObject | undefined;
  confirmReigon: string[] | undefined;

  setConfirmDesgin: (confirmDesgin: string[]) => void;
  setConfirmPrice: (confirmPrice: priceObject | undefined) => void;
  setConfirmReigon: (confirmReigon: string[]) => void;
}

const useFilteringStore = create<IFilteringStore>((set) => ({
  confirmDesgin: undefined,
  confirmPrice: undefined,
  confirmReigon: undefined,
  setConfirmDesgin: (confirmDesgin) => set({ confirmDesgin }),
  setConfirmPrice: (confirmPrice) => set({ confirmPrice }),
  setConfirmReigon: (confirmReigon) => set({ confirmReigon }),
}));

export default useFilteringStore;
