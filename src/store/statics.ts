import { create } from 'zustand';

import { type Employee } from '@/types/types';
import { Message } from '@/components/dashboard/overview/latest-messages';
import { type Movement } from '@/components/dashboard/overview/latest-movements';
import { type Notification } from '@/components/dashboard/overview/latest-products';
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
  promedyControls: { name: string; data: number[] }[];
  notifications: Notification[];
  messages: Message[];
  timesPerSuit: {
    chartSeries: { name: string; data: number[] }[];
    labels: string[];
  };
  cleansPerSuitByEmpregado: {
    chartSeries: { name: string; data: number[] }[];
    labels: string[];
    empregadoId: number | string;
  };

  // Actions
  setLimpezasMonth: (n: number) => void;
  setControlsMonth: (n: number) => void;
  setEmployeeMonth: (n: Employee) => void;
  setMovements: (n: Movement[]) => void;
  setLoading: (n: boolean) => void;
  setCleansPerSuit: (n: { results: Result[]; year: string }) => void;
  setPromedyControls: (n: { data: number[]; year: string }) => void;
  setNotifications: (n: Notification[]) => void;
  setMessages: (n: Message[]) => void;
  setTimePerSuit: (n: { labels: string[]; chartSeries: { data: number[]; name: string } }) => void;
  setCleansPerSuitByEmpregado: (n: {
    labels: string[];
    chartSeries: { data: number[]; name: string };
    empregadoId: number | string;
  }) => void;
}

const useStore = create<StaticsState>((set) => ({
  isLoading: false,
  limpezasMonth: 0,
  controlsMonth: 0,
  employeeMonth: null,
  movements: [],
  cleansPerSuit: { chartSeries: [], labels: [] },
  promedyControls: [],
  notifications: [],
  messages: [],
  timesPerSuit: { chartSeries: [], labels: [] },
  cleansPerSuitByEmpregado: { chartSeries: [], labels: [], empregadoId: '' },

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
  setPromedyControls: (data: { data: number[]; year: string }): void => {
    set(() => ({
      promedyControls: [{ name: data.year, data: data.data }],
    }));
  },
  setNotifications(n: Notification[]): void {
    set(() => ({ notifications: n }));
  },
  setMessages(n: Message[]): void {
    set(() => ({ messages: n }));
  },
  setTimePerSuit: (data: { labels: string[]; chartSeries: { data: number[]; name: string } }): void => {
    set(() => ({
      timesPerSuit: {
        chartSeries: [{ name: data.chartSeries.name, data: data.chartSeries.data }],
        labels: data.labels,
      },
    }));
  },
  setCleansPerSuitByEmpregado: (data: {
    labels: string[];
    chartSeries: { data: number[]; name: string };
    empregadoId: number | string;
  }): void => {
    set(() => ({
      cleansPerSuitByEmpregado: {
        chartSeries: [{ name: data.chartSeries.name, data: data.chartSeries.data }],
        labels: data.labels,
        empregadoId: data.empregadoId,
      },
    }));
  },
}));

export default useStore;
