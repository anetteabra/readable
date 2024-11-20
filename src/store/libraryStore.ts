import { Book } from "../queries";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import getOrCreateUserId from "@/utils/generateUserID";
import { favoriteBook, unfavoriteBook } from "@/queries";

interface LibraryState {
  userId: string; // Unique user ID
  books: Book[]; // All books fetched from the server
  loading: boolean;
  error: string | null;
  setBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  sortBy: string;
  filterBy: {
    favorited: boolean;
    genre: string | null;
  };
  setSortBy: (sortBy: string) => void;
  toggleFilter: (filter: "favorited") => void;
  setFavoriteFilter: (isEnabled: boolean) => void;
  setGenreFilter: (genre: string | null) => void;
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  isFavorited: (bookId: string) => boolean;
  sortBooks: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  sortField: string;
  setSortField: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const useLibraryStore = create(
  persist<LibraryState>(
    (set, get) => ({
      userId: getOrCreateUserId(),
      books: [],
      loading: false,
      error: null,
      inputValue: "",
      setInputValue: (value) => set({ inputValue: value.toUpperCase() }),
      sortField: "title",
      sortOrder: "ASC",
      favoritesUpdatedAt: Date.now(),

      setSortField: (value) => set({ sortField: value }),
      setSortOrder: (value) => {
        if (value === "ASC" || value === "DESC") {
          set({ sortOrder: value });
        } else {
          console.warn("Invalid sortOrder value. Use 'ASC' or 'DESC'.");
        }
      },
      sortBy: "Title a-z", // default sorting by title
      filterBy: { favorited: false, genre: "" }, // default filter settings
      favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), // Load favorites from local storage

      // Actions for setting books, loading, and error (external fetched in book component and stored in zustand)
      setBooks: (books) => {
        set({ books });
        get().sortBooks(); // Sort books whenever they are set
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Sort and filter actions
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().sortBooks(); // Sort books whenever the sorting changes
      },

      toggleFilter: (filter) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            [filter]: !state.filterBy[filter],
          },
        }));
      },

      setGenreFilter: (genre) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            genre: genre ?? "",
          },
        }));
        get().sortBooks();
      },

      toggleFavorite: async (bookId) => {
        const { favorites, userId, filterBy, books } = get();
        const isFavorited = favorites.includes(bookId);

        // Update favorites and local storage
        const updatedFavorites = isFavorited
          ? favorites.filter((id) => id !== bookId)
          : [...favorites, bookId];

        set({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        try {
          if (isFavorited) {
            await unfavoriteBook(bookId, userId);
          } else {
            await favoriteBook(bookId, userId);
          }

          // If the `favorited` filter is active, update the `books` list immediately
          if (filterBy.favorited) {
            set({
              books: books.filter((book) => updatedFavorites.includes(book.id)),
            });
          }
        } catch (error) {
          console.error("Failed to toggle favorite:", error);
        }
      },

      isFavorited: (bookId) => get().favorites.includes(bookId),

      setFavoriteFilter: (isEnabled) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            favorited: isEnabled,
          },
        }));
      },

      // Sorting functionality combined with filtering
      sortBooks: () => {
        const { sortBy } = get();

        switch (sortBy) {
          case "Title a-z":
            set({ sortField: "title", sortOrder: "ASC" });
            break;
          case "Title z-a":
            set({ sortField: "title", sortOrder: "DESC" });
            break;
          case "Newest":
            set({ sortField: "publication_date", sortOrder: "DESC" });
            break;
          case "Oldest":
            set({ sortField: "publication_date", sortOrder: "ASC" });
            break;
          default:
            console.warn("Invalid sortBy option");
        }
      },
    }),
    {
      name: "library-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useLibraryStore;
