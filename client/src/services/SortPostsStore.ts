import { create } from 'zustand';

type State = {
  sortMessage: 'Ascending' | 'Descending';
};

type Action = {
  setSortMessage: (sortMessage: 'Ascending' | 'Descending') => void;
};

export const useSortPostsStore = create<State & Action>((set) => ({
  sortMessage: 'Ascending',
  setSortMessage: (sortMessage) => set({ sortMessage }),
}));
