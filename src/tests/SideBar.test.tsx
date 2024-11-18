import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import SideBar from '../components/SideBar'; // Adjust the import path as necessary
import useLibraryStore from '../store/libraryStore' ; // Adjust the import path as necessary

// Mock the Zustand store
vi.mock('@/store/libraryStore', () => {
    return {
      __esModule: true,
      default: vi.fn(),
    };
  });

const mockStore = {
  sortBy: 'Title a-z',
  setSortBy: vi.fn(),
  filterBy: { favorited: false, genre: null },
  setFavoritedFilter: vi.fn(),
  setGenreFilter: vi.fn(),
};

describe('SideBar Component', () => {
    beforeEach(() => {
      mockStore.setSortBy.mockReset();
      mockStore.setFavoritedFilter.mockReset();
      mockStore.setGenreFilter.mockReset();

      (useLibraryStore as unknown as vi.Mock).mockReturnValue(mockStore);
      });
  

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sidebar with sorting and filtering options', () => {
    render(<SideBar />);
    expect(screen.getByText('Sort and filter your library')).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByText('Filter by:')).toBeInTheDocument();
    expect(screen.getByText('Favorited')).toBeInTheDocument();
    expect(screen.getByText('Genres:')).toBeInTheDocument();
  });

  it('toggles the sidebar visibility', () => {
    render(<SideBar />);
    const toggleButton = screen.getByLabelText('Open Menu');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Close Menu')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close Menu'));
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();
  });

  it('calls setSortBy when a sorting option is selected', () => {
    render(<SideBar />);
    fireEvent.click(screen.getByText('Title a-z'));
    fireEvent.click(screen.getByText('Title z-a'));
    expect(mockStore.setSortBy).toHaveBeenCalledWith('Title z-a');
  });

  it('calls setFavoriteFilter when the favorited checkbox is clicked', () => {
    render(<SideBar />);
    const favoritedCheckbox = screen.getByLabelText('Favorited');
    fireEvent.click(favoritedCheckbox);
    expect(mockStore.setFavoritedFilter).toHaveBeenCalledWith('favorited');
  });

  it('calls setGenreFilter when a genre is selected', () => {
    render(<SideBar />);
    const genreCheckbox = screen.getByLabelText('Fiction');
    fireEvent.click(genreCheckbox);
    expect(mockStore.setGenreFilter).toHaveBeenCalledWith('Fiction');
    fireEvent.click(genreCheckbox);
    expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
  });
});


