import { create } from 'zustand';

interface CalendarStore {
  DateNumber: number | undefined;
  Time: string | null;
  Period: string | null;
  filteringDate: Date | null;
  setDateNumber: (DateNumber: number) => void;
  setTime: (Time: string) => void;
  setPeriod: (Period: string) => void;
  setFilteringDate: (newDate: Date) => void;
}

const useCalenderStore = create<CalendarStore>((set) => ({
  DateNumber: undefined, //일
  Time: null, //시간대
  Period: null, //오전오후
  filteringDate: null, //년 월 일 시간대 오전 오후 포함
  setDateNumber: (DateNumber) => set({ DateNumber }),
  setTime: (Time) => set({ Time }),
  setPeriod: (Period) => set({ Period }),
  setFilteringDate: (newDate) =>
    set(() => ({
      filteringDate: newDate,
    })),
}));

export default useCalenderStore;
