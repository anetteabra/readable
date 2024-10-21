import { Book } from "@/queries";
import { create } from "zustand";

interface LibraryState {
  books: Book[];
  loading: boolean;
  error: string | null;
  setBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  sortBy: string;
  filterBy: {
    favorited: boolean;
    unavailable: boolean;
  };
  setSortBy: (sortBy: string) => void;
  toggleFilter: (filter: "favorited" | "unavailable") => void;
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
}

const useLibraryStore = create<LibraryState>((set) => ({
  books: [],
  loading: false,
  error: null,

  sortBy: "Title", // default sorting by Title
  filterBy: { favorited: false, unavailable: false }, // default filter settings
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), // Load favorites from local storage

  // Actions for setting books, loading, and error (external fetched in book component and stored in zustand)
  setBooks: (books) => set((state) => ({ ...state, books })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  setError: (error) => set((state) => ({ ...state, error })),

  // Sort and filter actions
  setSortBy: (sortBy) => set({ sortBy }),
  toggleFilter: (filter) =>
    set((state) => ({
      filterBy: {
        ...state.filterBy,
        [filter]: !state.filterBy[filter],
      },
    })),

  // Favorites actions
  toggleFavorite: (bookId) =>
    set((state) => {
      const updatedFavorites = state.favorites.includes(bookId)
        ? state.favorites.filter((id) => id !== bookId)
        : [...state.favorites, bookId];

      // Update local storage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return { favorites: updatedFavorites };
    }),
}));

export default useLibraryStore;
