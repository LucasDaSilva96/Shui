import { create } from 'zustand';

type State = {
  isLoading: boolean;
};

type Action = {
  setIsLoading: (isLoading: boolean) => void;
  setNotLoading: () => void;
};

export const useLoadingStore = create<State & Action>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setNotLoading: () => set({ isLoading: false }),
}));
