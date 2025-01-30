import { create } from 'zustand';

interface StaticsState {
  // States
  limpezasMonth: number;
  controlsMonth: number;
  employeeMonth: number;

  // Actions
  setLimpezasMonth: (n: number) => void;
  setControlsMonth: (n: number) => void;
  setEmployeeMonth: (n: number) => void;
}

const useStore = create<StaticsState>((set) => ({
  limpezasMonth: 0,
  controlsMonth: 0,
  employeeMonth: 0,
  setLimpezasMonth: (quantity: number): void => {
    set(() => ({ limpezasMonth: quantity }));
  },
  setControlsMonth: (quantity: number): void => {
    set(() => ({ controlsMonth: quantity }));
  },
  setEmployeeMonth: (quantity: number): void => {
    set(() => ({ employeeMonth: quantity }));
  },
}));

export default useStore;
