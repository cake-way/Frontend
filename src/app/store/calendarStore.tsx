import { create } from 'zustand';

interface CalendarStore {
  DateNumber: number | undefined;
  Time: string | null;
  Period: string | null;
  filteringDate: Date;
  setDateNumber: (DateNumber: number) => void;
  setTime: (Time: string) => void;
  setPeriod: (Period: string) => void;
  setFilteringDate: (newDate: Date) => void;
}

const useCalenderStore = create<CalendarStore>((set) => ({
  DateNumber: undefined,
  Time: null,
  Period: null,
  filteringDate: new Date(),
  setDateNumber: (DateNumber) => set({ DateNumber }),
  setTime: (Time) => set({ Time }),
  setPeriod: (Period) => set({ Period }),
  setFilteringDate: (newDate) =>
    set(() => ({
      filteringDate: newDate,
    })),
}));

export default useCalenderStore;
