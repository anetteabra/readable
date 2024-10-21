import { Book } from "@/queries";
import { create } from "zustand";

interface LibraryState {
  books: Book[]; // All books fetched from the server
  filteredBooks: Book[]; // Filtered book array
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
  sortBooks: () => void;
  isFavorited: (bookId: string) => boolean;
}

const useLibraryStore = create<LibraryState>((set, get) => ({
  books: [],
  filteredBooks: [], // Filtered and sorted books to be displayed
  loading: false,
  error: null,

  sortBy: "Title a-z", // default sorting by Title
  filterBy: { favorited: false, unavailable: false }, // default filter settings
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), // Load favorites from local storage
  isFavorited: (bookId: string) => get().favorites.includes(bookId),

  // Actions for setting books, loading, and error (external fetched in book component and stored in zustand)
  setBooks: (books) => {
    set({ books, filteredBooks: books });
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
    get().sortBooks(); // Apply filtering again after toggling the filter
  },

  // Favorites toggle
  toggleFavorite: (bookId) => {
    set((state) => {
      const updatedFavorites = state.favorites.includes(bookId)
        ? state.favorites.filter((id) => id !== bookId)
        : [...state.favorites, bookId];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
    get().sortBooks(); // Reapply filtering after favorites change
  },

  // Sorting functionality combines with filtering
  sortBooks: () => {
    const { books, sortBy, filterBy, favorites } = get();

    //Filter the books first based on the current filters
    let filteredBooks = [...books];

    if (filterBy.favorited) {
      filteredBooks = filteredBooks.filter((book) =>
        favorites.includes(book.id),
      );
    }
    // (You can add more filtering logic for 'unavailable' if needed)
    // if (filterBy.unavailable) {
    //   Implement your logic for unavailable books here
    //   Example: filteredBooks = filteredBooks.filter(book => !book.available);
    // }

    // Sort the filtered books based on the current sortBy option

    switch (sortBy) {
      case "Title a-z":
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title z-a":
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Author a-z":
        filteredBooks.sort((a, b) =>
          a.author.name.localeCompare(b.author.name),
        );
        break;
      case "Author z-a":
        filteredBooks.sort((a, b) =>
          b.author.name.localeCompare(a.author.name),
        );
        break;
      default:
        break;
    }

    //Update the Zustand state with the sorted and filtered books
    set({ filteredBooks });
  },
}));

export default useLibraryStore;
