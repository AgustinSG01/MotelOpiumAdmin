import { create } from 'zustand';

import { type Employee } from '@/types/types';
import { type Movement } from '@/components/dashboard/overview/latest-movements';
import { type Result } from '@/components/dashboard/overview/quantity-cleans-suits';

interface StaticsState {
  // States
  isLoading: boolean;
  limpezasMonth: number;
  controlsMonth: number;
  employeeMonth: Employee | null;
  movements: Movement[];
  cleansPerSuit: {
    chartSeries: { name: string; data: number[] }[];
    labels: string[];
  };

  // Actions
  setLimpezasMonth: (n: number) => void;
  setControlsMonth: (n: number) => void;
  setEmployeeMonth: (n: Employee) => void;
  setMovements: (n: Movement[]) => void;
  setLoading: (n: boolean) => void;
  setCleansPerSuit: (n: { results: Result[]; year: string }) => void;
}

const useStore = create<StaticsState>((set) => ({
  isLoading: false,
  limpezasMonth: 0,
  controlsMonth: 0,
  employeeMonth: null,
  movements: [],
  cleansPerSuit: { chartSeries: [], labels: [] },
  setLoading: (isLoading: boolean): void => {
    set(() => ({ isLoading }));
  },
  setLimpezasMonth: (quantity: number): void => {
    set(() => ({ limpezasMonth: quantity }));
  },
  setControlsMonth: (quantity: number): void => {
    set(() => ({ controlsMonth: quantity }));
  },
  setEmployeeMonth: (employee: Employee): void => {
    set(() => ({ employeeMonth: employee }));
  },
  setMovements: (movements: Movement[]): void => {
    set(() => ({ movements }));
  },
  setCleansPerSuit: (data: { results: Result[]; year: string }): void => {
    set(() => ({
      cleansPerSuit: {
        chartSeries: [{ name: data.year, data: data.results.map((item) => item.limpezas) }],
        labels: data.results.map((item) => item.suit),
      },
    }));
  },
}));

export default useStore;
