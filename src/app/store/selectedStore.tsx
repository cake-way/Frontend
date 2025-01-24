import { create } from 'zustand';

interface ISelectedStore {
  selectedDesign: string[];
  selectedMaxPrice: number | undefined;
  selectedMinPrice: number | undefined;
  selectedSub: string[];

  setSelectedDesign: (callback: (prev: string[]) => string[]) => void;
  setSelectedMaxPrice: (selectedMaxPrice: number) => void;
  setSelectedSub: (callback: (prev: string[]) => string[]) => void;
  setSelectedMinPrice: (selectedMinPrice: number) => void;
}

const useSelectedStore = create<ISelectedStore>((set) => ({
  selectedDesign: [],
  selectedMaxPrice: undefined,
  selectedMinPrice: undefined,
  selectedSub: [],
  setSelectedDesign: (callback) =>
    set((state) => ({
      selectedDesign: callback(state.selectedDesign),
    })),
  setSelectedMaxPrice: (selectedMaxPrice) => set({ selectedMaxPrice }),
  setSelectedSub: (callback) =>
    set((state) => ({ selectedSub: callback(state.selectedSub) })),
  setSelectedMinPrice: (selectedMinPrice) => set({ selectedMinPrice }),
}));

export default useSelectedStore;
