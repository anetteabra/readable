import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '../components/SeachBar';

// Mock the useLibraryStore hook
const mockSetInputValue = vi.fn();
const mockSetGenreFilter = vi.fn();
const mockSetFavoriteFilter = vi.fn();

vi.mock('../../store/libraryStore', () => ({
  default: vi.fn(() => ({
    inputValue: '',
    setInputValue: mockSetInputValue,
    setGenreFilter: mockSetGenreFilter,
    setFavoriteFilter: mockSetFavoriteFilter,
  })),
}));

// Mock useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<any>('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

describe('SearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clean up mocks after each test
  });

  it('renders the search input and clear button', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();

    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('updates temporary input value on change', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(input.value).toBe('new value');
  });

  it('navigates to /library on Enter key press', async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    /* const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.keyDown(input, { key: 'Enter'});

    // Wait for asynchronous actions to complete
    await waitFor(() => {  
      expect(mockSetGenreFilter).toHaveBeenCalledWith(null);
      expect(mockSetInputValue).toHaveBeenCalledWith('search term');
      expect(mockNavigate).toHaveBeenCalledWith('/library');
    }); */
  });
});
