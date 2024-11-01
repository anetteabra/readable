import { Book } from "@/queries";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
    genre: string | null;
  };
  setSortBy: (sortBy: string) => void;
  toggleFilter: (filter: "favorited") => void;
  setFavoriteFilter: (isEnabled: boolean) => void;
  setGenreFilter: (genre: string | null) => void;
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  sortBooks: () => void;
  isFavorited: (bookId: string) => boolean;
  inputValue: string; 
  setInputValue: (value: string) => void;
}


const useLibraryStore = create(
  persist<LibraryState>(
    (set, get) => ({
      books: [],
      filteredBooks: [], // Filtered and sorted books to be displayed
      loading: false,
      error: null,
      inputValue: "", // Add this line with default empty string
      setInputValue: (value) => set({ inputValue: value }), // Add this line

      sortBy: "Title a-z", // default sorting by Title
      filterBy: { favorited: false, unavailable: false, genre: null }, // default filter settings
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

      // Add method to set genre filter
      setGenreFilter: (genre) => {
        set((state) => ({
          filterBy: {
            ...state.filterBy,
            genre, // Set the selected genre
          },
        }));
        get().sortBooks();
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
        const { books, sortBy, filterBy, favorites } = get();

        //Filter the books first based on the current filters
        let filteredBooks = [...books];

        if (filterBy.favorited) {
          filteredBooks = filteredBooks.filter((book) =>
            favorites.includes(book.id),
          );
        }

        // Filter by genre if one is selected
        if (filterBy.genre) {
          filteredBooks = filteredBooks.filter(
            (book) =>
              filterBy.genre &&
              book.genre.toLowerCase() === filterBy.genre.toLowerCase(),
          );
        }

        // Sort the filtered books based on the current sortBy option
        switch (sortBy) {
          case "Title a-z":
            filteredBooks.sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
            );
            break;
          case "Title z-a":
            filteredBooks.sort((a, b) =>
              a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1,
            );
            break;

          case "Author a-z":
            filteredBooks.sort((a, b) =>
              a.author.name.toLowerCase() > b.author.name.toLowerCase()
                ? 1
                : -1,
            );
            break;
          case "Author z-a":
            filteredBooks.sort((a, b) =>
              a.author.name.toLowerCase() < b.author.name.toLowerCase()
                ? 1
                : -1,
            );
            break;
          case "Newest":
            filteredBooks.sort((a, b) => {
              const dateA = parseDate(a.publication_date); // Parse the date
              const dateB = parseDate(b.publication_date);
              return dateB.getTime() - dateA.getTime(); // Sort from newest to oldest
            });
            break;
          case "Oldest":
            filteredBooks.sort((a, b) => {
              const dateA = parseDate(a.publication_date);
              const dateB = parseDate(b.publication_date);
              return dateA.getTime() - dateB.getTime(); // Sort from oldest to newest
            });
            break;
          default:
            break;
        }

        //Update the Zustand state with the sorted and filtered books
        set({ filteredBooks });
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