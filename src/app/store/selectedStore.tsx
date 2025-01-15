import { create } from 'zustand';

interface ISelectedStore {
  selectedDesign: string[];
  selectedPrice: number;
  selectedSub: string[];

  setSelectedDesign: (callback: (prev: string[]) => string[]) => void;
  setSelectedPrice: (SelectedPrice: number) => void;
  setSelectedSub: (callback: (prev: string[]) => string[]) => void;
}

const useSelectedStore = create<ISelectedStore>((set) => ({
  selectedDesign: [],
  selectedPrice: 10,
  selectedSub: [],
  setSelectedDesign: (callback) =>
    set((state) => ({
      selectedDesign: callback(state.selectedDesign),
    })),
  setSelectedPrice: (selectedPrice) => set({ selectedPrice }),
  setSelectedSub: (callback) =>
    set((state) => ({ selectedSub: callback(state.selectedSub) })),
}));

export default useSelectedStore;
