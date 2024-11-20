import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BookCard from '../components/BookCard';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 
import FaveButton from '../components/FaveButton';

// Mock BookCard props
const mockBook = {
  id: '_01',
  title: 'LITTLE WOMEN',
  author: { name: 'Author 1' },
  favoritedBy: [{id:'test1d'}],
  cover: 'https://proconian.com/wp-content/uploads/2020/01/littlewomen.png',
  description: 'A novel about the lives of four sisters during the American Civil War.',
  genre: 'Fiction',
  publication_date: '1868-09-30',
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
        <BookCard book={mockBook} userId='test1d'/>
      </MemoryRouter>
    );

    expect(screen.getByText('LITTLE WOMEN')).toBeInTheDocument();
    expect(screen.getByText('by Author 1')).toBeInTheDocument();
  });

  it('displays book cover image', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} userId='test1d' />
      </MemoryRouter>
    );

    const img = screen.getByAltText('LITTLE WOMEN cover');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://proconian.com/wp-content/uploads/2020/01/littlewomen.png');
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '200');
  });

  it('renders favorite button', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} userId='test1d' />
      </MemoryRouter>
    );

    const faveButton = screen.getByText('Favorite');
    expect(faveButton).toBeInTheDocument();
  });

  it('navigates to the book details page when clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BookCard book={mockBook} userId='test1d'/>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/details/_01');
  });

  it('calls FaveButton on click', async () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} userId='test1d'/>
      </MemoryRouter>
    );

    const faveButton = screen.getByText('Favorite');
    fireEvent.click(faveButton);
    expect(FaveButton).toHaveBeenCalled();
  });
});
