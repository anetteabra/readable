import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi, Mock } from "vitest";
import BookBox from "../components/BookBox";
import { MockedProvider } from "@apollo/client/testing";
import useLibraryStore from "@/store/libraryStore";
import { GET_BOOKS } from "@/queries";

// Mock Zustand store
vi.mock('../store/libraryStore', () => {
    return {
      __esModule: true,
      default: vi.fn(),
  };
});
const mockStore = {
    userId: "test-user",
    books: [],
    loading: false,
    error: null as string | null,
    sortBy: "Title a-z",
    filterBy: { favorited: false, genre: null },
    favorites: [],
    inputValue: "",
    sortField: "title",
    sortOrder: "ASC",
    setBooks: vi.fn((books) => useLibraryStore.setState({ books })),
    setLoading: vi.fn((loading) => useLibraryStore.setState({ loading })),
    setError: vi.fn((error) => useLibraryStore.setState({ error })),
    setSortBy: vi.fn(),
    toggleFilter: vi.fn(),
    setFavoriteFilter: vi.fn(),
    setGenreFilter: vi.fn(),
    toggleFavorite: vi.fn(),
    isFavorited: vi.fn(),
    sortBooks: vi.fn(),
    setInputValue: vi.fn(),
    setSortField: vi.fn(),
    setSortOrder: vi.fn(),
  };

  describe('BookBox Component', () => {

    beforeEach(() => {

        mockStore.setBooks.mockReset();
        mockStore.setLoading.mockReset();
        mockStore.setError.mockReset();

      
        (useLibraryStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
        
        mockStore.books = [];
        mockStore.loading = false;
        mockStore.error = null;
        mockStore.filterBy = { favorited: false, genre: null };
        });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('renders the BookBox component with books', async () => {
      const mocks = [
        {
          request: {
            query: GET_BOOKS,
            variables: {
              options: { limit: 12, offset: 0, sort: { title: 'ASC' } },
              genre: null,
              searchTerm: '',
              userId: undefined,
            },
          },
          result: {
            data: {
                books: [
                    {
                      id: "1",
                      title: "Book 1",
                      author: { name: "Author 1" },
                      genre: "Genre 1",
                      publication_date: "2021",
                      description: "Description 1",
                      cover: "/cover1.jpg",
                    },
                    {
                      id: "2",
                      title: "Book 2",
                      author: { name: "Author 2" },
                      genre: "Genre 2",
                      publication_date: "2022",
                      description: "Description 2",
                      cover: "/cover2.jpg",
                    },
                  ],
            },
          },
        },
      ];
  
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BookBox />
        </MockedProvider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Book 1')).toBeInTheDocument();
        expect(screen.getByText('Book 2')).toBeInTheDocument();
      });
    });
  
    it('displays loading message when loading', async () => {
        mockStore.loading = true;
  
        render(
            <MockedProvider mocks={[]} addTypename={false}>
            <BookBox />
            </MockedProvider>
        );
      
      await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
    });
  
    it('displays error message when there is an error', async () => {
        mockStore.error = "GraphQL Error";
  
        render(
            <MockedProvider mocks={[]} addTypename={false}>
            <BookBox />
            </MockedProvider>
        );
      
      await waitFor(() => {
      expect(screen.getByText('Error: GraphQL Error')).toBeInTheDocument();
        });
    });
  
    it('displays no books found message when there are no books', async () => {
        mockStore.books = [];
  
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <BookBox />
        </MockedProvider>
      );
      
      await waitFor(() => {
      expect(screen.getByText('No books found')).toBeInTheDocument();
        });
    });
  });