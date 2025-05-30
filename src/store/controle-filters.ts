import { create } from 'zustand';

import { type Value } from '@/components/dashboard/MultipleSelector';

const baseScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface FilterState {
  suitList: Value[];
  limpezaScoreList: Value[];
  cheiroScoreList: Value[];
  manutScoreList: Value[];
  tvScoreList: Value[];
  roupaScoreList: Value[];
  garagemScoreList: Value[];
  faxinaScoreList: Value[];
  abastecScoreList: Value[];
  empregadoList: Value[];
  gerenteList: Value[];
  selectedYear: number;
  selectedMonth: number;
  setSuitList: (suitList: Value[]) => void;
  setLimpezaScoreList: (limpezaScoreList: Value[]) => void;
  setCheiroScoreList: (cheiroScoreList: Value[]) => void;
  setManutScoreList: (manutScoreList: Value[]) => void;
  setTvScoreList: (tvScoreList: Value[]) => void;
  setRoupaScoreList: (roupaScoreList: Value[]) => void;
  setGaragemScoreList: (garagemScoreList: Value[]) => void;
  setFaxinaScoreList: (faxinaScoreList: Value[]) => void;
  setAbastecScoreList: (abastecScoreList: Value[]) => void;
  setEmpregadoList: (empregadoList: Value[]) => void;
  setGerenteList: (gerenteList: Value[]) => void;
  resetFilters: () => void;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
}

export const useControleFilters = create<FilterState>((set) => ({
  suitList: [],
  limpezaScoreList: baseScores,
  cheiroScoreList: baseScores,
  manutScoreList: baseScores,
  tvScoreList: baseScores,
  roupaScoreList: baseScores,
  garagemScoreList: baseScores,
  faxinaScoreList: baseScores,
  abastecScoreList: baseScores,
  empregadoList: [],
  gerenteList: [],
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth(),
  setSuitList: (suitList: Value[]) => {
    set({ suitList });
  },
  setLimpezaScoreList: (limpezaScoreList: Value[]) => {
    set({ limpezaScoreList });
  },
  setCheiroScoreList: (cheiroScoreList: Value[]) => {
    set({ cheiroScoreList });
  },
  setManutScoreList: (manutScoreList: Value[]) => {
    set({ manutScoreList });
  },
  setTvScoreList: (tvScoreList: Value[]) => {
    set({ tvScoreList });
  },
  setRoupaScoreList: (roupaScoreList: Value[]) => {
    set({ roupaScoreList });
  },
  setGaragemScoreList: (garagemScoreList: Value[]) => {
    set({ garagemScoreList });
  },
  setFaxinaScoreList: (faxinaScoreList: Value[]) => {
    set({ faxinaScoreList });
  },
  setAbastecScoreList: (abastecScoreList: Value[]) => {
    set({ abastecScoreList });
  },
  setEmpregadoList: (empregadoList: Value[]) => {
    set({ empregadoList });
  },
  setGerenteList: (gerenteList: Value[]) => {
    set({ gerenteList });
  },
  setSelectedYear: (year: number) => {
    set({ selectedYear: year });
  },
  setSelectedMonth: (month: number) => {
    set({ selectedMonth: month });
  },
  resetFilters: () => {
    set({
      suitList: [],
      empregadoList: [],
      gerenteList: [],
      limpezaScoreList: baseScores,
      cheiroScoreList: baseScores,
      manutScoreList: baseScores,
      tvScoreList: baseScores,
      roupaScoreList: baseScores,
      garagemScoreList: baseScores,
      faxinaScoreList: baseScores,
      abastecScoreList: baseScores,
    });
  },
}));
