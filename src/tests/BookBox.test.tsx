import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BookBox from "../components/BookBox";
import { GET_BOOKS } from './../queries';
import useLibraryStore from '../store/libraryStore.ts';
import { describe, it, beforeEach, vi, expect } from 'vitest';

// Example mock data for your GraphQL query
const mocks = [
  {
    request: {
      query: GET_BOOKS,
      variables: {
        options: { limit: 12, offset: 0, sort: { title: 'asc' } },
        genre: 'fiction',
        searchTerm: '',
      },
    },
    result: {
      data: {
        books: [
          { id: '1', title: 'Book 1', author: 'Author 1' },
          { id: '2', title: 'Book 2', author: 'Author 2' },
        ],
      },
    },
  },
];

// Mock Zustand store
vi.mock('../../store/libraryStore', () => ({
  ...vi.importActual('../../store/libraryStore'), // Import actual store functions to preserve them
  useLibraryStore: vi.fn(),
}));

describe('BookBox', () => {
  beforeEach(() => {
    // Mocking Zustand store state
    useLibraryStore.mockReturnValue({
      books: [
        { id: '1', title: 'Book 1', author: 'Author 1' },
        { id: '2', title: 'Book 2', author: 'Author 2' },
      ],
      filteredBooks: [],
      loading: false,
      error: null,
      favorites: ['1'],
      inputValue: '',
      sortBy: 'Title a-z',
      sortField: 'title',
      sortOrder: 'ASC',
      filterBy: { favorited: false, genre: '' },
      setBooks: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      setSortBy: vi.fn(),
      toggleFilter: vi.fn(),
      setFavoriteFilter: vi.fn(),
      setGenreFilter: vi.fn(),
      toggleFavorite: vi.fn(),
      sortBooks: vi.fn(),
      isFavorited: (bookId: string) => bookId === '1',
      setInputValue: vi.fn(),
      setSortField: vi.fn(),
      setSortOrder: vi.fn(),
    });
  });

  it('should render loading state initially', () => {
    useLibraryStore.mockReturnValueOnce({ loading: true });
    
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookBox />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display books when fetched', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookBox />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Book 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Book 2')).toBeInTheDocument());
  });

  it('should show error message if error occurs', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_BOOKS,
          variables: {
            options: { limit: 12, offset: 0, sort: { title: 'asc' } },
            genre: 'fiction',
            searchTerm: '',
          },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <BookBox />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Error: An error occurred')).toBeInTheDocument());
  });

  it('should call toggleFavorite when a book is favorited', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookBox />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText('Book 1'));

    fireEvent.click(screen.getByText('Book 1'));
    expect(useLibraryStore().toggleFavorite).toHaveBeenCalledWith('1');
  });

  it('should display "No books found" if there are no books', async () => {
    const emptyMocks = [
      {
        request: {
          query: GET_BOOKS,
          variables: {
            options: { limit: 12, offset: 0, sort: { title: 'asc' } },
            genre: 'fiction',
            searchTerm: '',
          },
        },
        result: {
          data: { books: [] },
        },
      },
    ];

    render(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <BookBox />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('No books found')).toBeInTheDocument());
  });
});


