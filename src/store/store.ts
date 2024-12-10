import { create } from 'zustand';

interface AdminState {
  // States
  notifications: number;

  // Actions
  setNotifications: (n: number) => void;
}

const useStore = create<AdminState>((set) => ({
  notifications: 0,
  setNotifications: (quantity: number): void => {
    set(() => ({ notifications: quantity }));
  },
}));

export default useStore;
