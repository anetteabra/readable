import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BookCard from '../components/BookCard';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // To mock routing
import FaveButton from '../components/FaveButton';

// Mock BookCard props
const mockBook = {
  id: '1',
  title: 'Book Title 1',
  author: { name: 'Author 1' },
  cover: 'cover-url',
  description: 'This is a test description',
  genre: 'fiction',
  publication_date: '2024-01-01',
  isbn13: '1234567890123',
};

// Mock FaveButton component (since it's a child component)
vi.mock('../components/FaveButton', () => ({
  default: vi.fn(() => <button>Favorite</button>),
}));

describe('BookCard', () => {
  it('renders book title and author', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText('Book Title 1')).toBeInTheDocument();
    expect(screen.getByText('by Author 1')).toBeInTheDocument();
  });

  it('displays book cover image', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Book Title 1 cover');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'cover-url');
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '200');
  });

  it('renders favorite button', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    const faveButton = screen.getByText('Favorite');
    expect(faveButton).toBeInTheDocument();
  });

  it('navigates to the book details page when clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/details/1');
  });

  it('calls FaveButton on click', async () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    const faveButton = screen.getByText('Favorite');
    fireEvent.click(faveButton);
    expect(FaveButton).toHaveBeenCalled();
  });
});
