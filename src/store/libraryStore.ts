import { Book } from "@/queries";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import  getOrCreateUserId from "@/utils/generateUserID";
import { favoriteBook, unfavoriteBook } from "@/queries";

interface LibraryState {
  userId: string; // Unique user ID
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
      filteredBooks: [], // Filtered and sorted books to be displayed
      loading: false,
      error: null,
      inputValue: "", // Add this line with default empty string
      setInputValue: (value) => set({ inputValue: value.toUpperCase()}), // Add this line
      sortField: "title",
      sortOrder: "ASC",

      setSortField: (value) => set({ sortField: value }),
      setSortOrder: (value) => {
        if (value === "ASC" || value === "DESC") {
          set({ sortOrder: value });
        } else {
          console.warn("Invalid sortOrder value. Use 'ASC' or 'DESC'.");
        }
      },
      sortBy: "Title a-z", // default sorting by Title
      filterBy: { favorited: false, unavailable: false, genre: ""}, // default filter settings
      favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), // Load favorites from local storage

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

      // Add method to set genre filter
      setGenreFilter: (genre) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            genre: genre ?? "", // Set the selected genre
          },
        }));
        get().sortBooks();
      },

      toggleFavorite: async (bookId) => {
        const { favorites, userId } = get();
        const isFavorited = favorites.includes(bookId);

        // Optimistic UI update: only update state if needed to prevent unnecessary renders
        if (isFavorited) {
          set({ favorites: favorites.filter((id) => id !== bookId) });
          try {
            await unfavoriteBook(bookId, userId);
          } catch (error) {
            console.error("Failed to unfavorite:", error);
            set({ favorites: [...favorites, bookId] }); // Rollback on failure
          }
        } else {
          set({ favorites: [...favorites, bookId] });
          try {
            await favoriteBook(bookId, userId);
          } catch (error) {
            console.error("Failed to favorite:", error);
            set({ favorites: favorites.filter((id) => id !== bookId) }); // Rollback on failure
          }
        }
      },
      
      isFavorited: (bookId: string) => get().favorites.includes(bookId),
      
      setFavoriteFilter: (isEnabled) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            favorited: isEnabled,
          },
        }));
        get().sortBooks(); // Reapply sorting and filtering
      },

      // Sorting functionality combines with filtering
      sortBooks: () => {
        const {sortBy} = get();

        //Filter the books first based on the current filters
        /* let filteredBooks = [...books]; */

        /* if (filterBy.favorited) {
          filteredBooks = filteredBooks.filter((book) =>
            favorites.includes(book.id),
          );
        } */

        // Filter by genre if one is selected
        // if (filterBy.genre) {
        //   filteredBooks = filteredBooks.filter(
        //     (book) =>
        //       filterBy.genre &&
        //       book.genre.toLowerCase() === filterBy.genre.toLowerCase(),
        //   );
        // }

        // Sort the filtered books based on the current sortBy option
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
      name: "library-storage", // The key to use for saving state in localStorage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// Function to parse publication_date as the dates for different books are in different formats, yyyy-mm-dd, yyyy-mm, yyyy
const parseDate = (publication_date: string) => {
  // Check if the date is valid
  if (!publication_date) return new Date(0); // Return a minimal date for sorting if publicationDate is null

  // Attempt to parse the full date first
  const fullDateMatch = publication_date.match(/^(\d{4})-(\d{2})-(\d{2})$/); // Check for YYYY-MM-DD
  if (fullDateMatch) {
    return new Date(publication_date); // Return full date
  }

  // Attempt to parse year and month
  const yearMonthMatch = publication_date.match(/^(\d{4})-(\d{2})$/); // Check for YYYY-MM
  if (yearMonthMatch) {
    return new Date(`${yearMonthMatch[1]}-${yearMonthMatch[2]}-01`); // Default to the first day of the month
  }

  // Finally, parse just the year
  const yearMatch = publication_date.match(/^(\d{4})$/); // Check YYYY
  if (yearMatch) {
    return new Date(`${yearMatch[1]}-01-01`); // Default to January 1st of the year
  }

  // If all parsing fails, return a minimal date
  return new Date(0); // Return a minimal date for sorting
};

export default useLibraryStore;

