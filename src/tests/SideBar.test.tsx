import { render, screen, fireEvent } from '@testing-library/react';
import SideBar from '../components/SideBar'; // Adjust the import path as needed
import { describe, expect, it, vi } from 'vitest'; // For mocking

// Mock zustand store
vi.mock('../../store/libraryStore', () => ({
  default: () => ({
    sortBy: 'Title a-z',
    setSortBy: vi.fn(),
    filterBy: { favorited: false, genre: null },
    toggleFilter: vi.fn(),
    setGenreFilter: vi.fn(),
  }),
}));

describe('SideBar', () => {
  it('renders and toggles sidebar visibility', () => {
    render(<SideBar />);

    // Check that the "Open Menu" button is initially visible
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();

    // Click the "Open Menu" button
    fireEvent.click(screen.getByLabelText('Open Menu'));

    // Check that the sidebar becomes visible and the button changes to "Close Menu"
    expect(screen.getByLabelText('Close Menu')).toBeInTheDocument();
    expect(screen.queryByLabelText('Open Menu')).not.toBeInTheDocument();

    // Click the "Close Menu" button
    fireEvent.click(screen.getByLabelText('Close Menu'));

    // Check that the sidebar is hidden again and the button changes back to "Open Menu"
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();
    expect(screen.queryByLabelText('Close Menu')).not.toBeInTheDocument();
  });

  it('handles sort by selection', () => {
    render(<SideBar />);

    // Open the sort by dropdown
    fireEvent.click(screen.getByText('Title a-z')); 

    // Select a new sort option
    fireEvent.click(screen.getByText('Newest'));

    // Check that the setSortBy function is called with the new value
    expect(vi.fn()).toHaveBeenCalledWith('Newest');
  });

  it('toggles favorited filter correctly', () => {
    render(<SideBar />);

    // Check if the checkbox for "Favorited" is not checked
    const favoritedCheckbox = screen.getByLabelText('Favorited') as HTMLInputElement;
    expect(favoritedCheckbox.checked).toBe(false);

    // Click the checkbox to toggle it
    fireEvent.click(favoritedCheckbox);

    // Check that the toggleFilter function is called with "favorited"
    expect(vi.fn()).toHaveBeenCalledWith('favorited');
  });

  it('sets genre filter correctly when a genre is selected', () => {
    render(<SideBar />);

    // Find a genre checkbox (e.g., "Fiction")
    const genreCheckbox = screen.getByLabelText('Fiction') as HTMLInputElement;

    // Click the checkbox to select the genre
    fireEvent.click(genreCheckbox);

    // Check that the setGenreFilter function is called with the selected genre
    expect(vi.fn()).toHaveBeenCalledWith('Fiction');
  });

  it('deselects genre filter when the same genre is clicked again', () => {
    render(<SideBar />);

    // Initially, select "Fiction"
    fireEvent.click(screen.getByLabelText('Fiction'));

    // Deselect "Fiction" by clicking it again
    fireEvent.click(screen.getByLabelText('Fiction'));

    // Check that the setGenreFilter function is called with null to deselect the genre
    expect(vi.fn()).toHaveBeenCalledWith(null);
  });
});
