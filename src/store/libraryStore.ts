import { create } from 'zustand';

interface LibraryState {
  sortBy: string;
  filterBy: {
    available: boolean;
    unavailable: boolean;
  };
  setSortBy: (sortBy: string) => void;
  toggleFilter: (filter: 'available' | 'unavailable') => void;
}

const useLibraryStore = create<LibraryState>((set) => ({
  sortBy: 'name', // default sorting by name
  filterBy: { available: false, unavailable: false }, // default filter settings

  // Actions
  setSortBy: (sortBy) => set({ sortBy }),
  toggleFilter: (filter) => set((state) => ({
    filterBy: {
      ...state.filterBy,
      [filter]: !state.filterBy[filter],
    },
  })),
}));

export default useLibraryStore;