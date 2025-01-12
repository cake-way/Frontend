import { create } from 'zustand';

interface CalendarStore {
  DateNumber: number | undefined;
  Time: string | null;
  Period: string | null;
  Date: Date;
  setDateNumber: (DateNumber: number) => void;
  setTime: (Time: string) => void;
  setPeriod: (Period: string) => void;
  setDate: (newDate: Date) => void;
}

const useCalenderStore = create<CalendarStore>((set) => ({
  DateNumber: undefined,
  Time: null,
  Period: null,
  Date: new Date(),
  setDateNumber: (DateNumber) => set({ DateNumber }),
  setTime: (Time) => set({ Time }),
  setPeriod: (Period) => set({ Period }),
  setDate: (newDate) =>
    set(() => ({
      Date: newDate,
    })),
}));

export default useCalenderStore;
