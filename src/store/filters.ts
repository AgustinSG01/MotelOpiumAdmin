import { type Dayjs } from 'dayjs';
import { create } from 'zustand';

interface LimpezaState {
  // States
  orderBy: string;
  suit: string;
  empregado: string;
  gerente: string;
  faxina: string | boolean;
  initialDate: string | Dayjs;
  finalDate: string | Dayjs;
  state: string;

  // Actions
  setOrderBy: (order: string) => void;
  setSuit: (suit: string) => void;
  setEmpregado: (empregado: string) => void;
  setGerente: (gerente: string) => void;
  setFaxina: (faxina: boolean) => void;
  setInitialDate: (initialDate: string | Dayjs) => void;
  setFinalDate: (finalDate: string | Dayjs) => void;
  resetFilters: () => void;
  setState: (state: string) => void;
}

export const useLimpezaFilters = create<LimpezaState>((set) => ({
  orderBy: 'data;desc',
  suit: 'all',
  empregado: 'all',
  gerente: 'all',
  faxina: 'all',
  initialDate: 'all',
  finalDate: 'all',
  state: 'all',

  setOrderBy: (order: string): void => {
    set(() => ({ orderBy: order }));
  },
  setSuit: (suit: string): void => {
    set(() => ({ suit }));
  },
  setEmpregado: (empregado: string): void => {
    set(() => ({ empregado }));
  },
  setGerente: (gerente: string): void => {
    set(() => ({ gerente }));
  },
  setFaxina: (faxina: boolean): void => {
    set(() => ({ faxina }));
  },
  setInitialDate: (initialDate: string | Dayjs): void => {
    set(() => ({ initialDate }));
  },
  setFinalDate: (finalDate: string | Dayjs): void => {
    set(() => ({ finalDate }));
  },
  setState: (state: string): void => {
    set(() => ({ state }));
  },
  resetFilters: (): void => {
    set(() => ({
      orderBy: 'data;desc',
      suit: 'all',
      empregado: 'all',
      gerente: 'all',
      faxina: 'all',
      initialDate: 'all',
      finalDate: 'all',
      state: 'all',
    }));
  },
}));
