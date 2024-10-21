import { create } from "zustand";

interface LibraryState {
  sortBy: string;
  filterBy: {
    available: boolean;
    unavailable: boolean;
  };
  setSortBy: (sortBy: string) => void;
  toggleFilter: (filter: "available" | "unavailable") => void;
}

const useLibraryStore = create<LibraryState>((set) => ({
  sortBy: "Title a-z", // default sorting by Title
  filterBy: { available: false, unavailable: false }, // default filter settings

  // Actions
  setSortBy: (sortBy) => set({ sortBy }),
  toggleFilter: (filter) =>
    set((state) => ({
      filterBy: {
        ...state.filterBy,
        [filter]: !state.filterBy[filter],
      },
    })),
}));

export default useLibraryStore;
