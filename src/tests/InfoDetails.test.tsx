// src/components/InfoDetails/InfoDetails.test.tsx
import { render, screen } from "@testing-library/react";
import InfoDetails from "../components/InfoDetails";
import { describe, expect, it } from "vitest";

// Mock the `Book` type data
const mockBook = {
  title: "Test Book",
  author: { name: "Test Author" },
  favoritedBy: [{ id: "test1d" }],
  genre: "Fiction",
  publication_date: "2024-01-01",
  description: "A description of the test book.",
  cover: "https://example.com/book-cover.jpg",
  id: "_01",
};

describe("InfoDetails Component", () => {
  it("renders the book details correctly", () => {
    // Render the InfoDetails component with mock book data
    render(<InfoDetails book={mockBook} />);

    // Check if the book title is rendered
    expect(screen.getByText(/Title:/)).toBeInTheDocument();
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();

    // Check if the book author is rendered
    expect(screen.getByText(/Author:/)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author.name)).toBeInTheDocument();

    // Check if the book genre is rendered
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    expect(screen.getByText(mockBook.genre)).toBeInTheDocument();

    // Check if the publication date is rendered
    expect(screen.getByText(/Publication date:/)).toBeInTheDocument();
    expect(screen.getByText(mockBook.publication_date)).toBeInTheDocument();

    // Check if the book description is rendered
    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();

    // Check if the book cover image is rendered
    const img = screen.getByAltText(mockBook.title);
    expect(img).toHaveAttribute("src", mockBook.cover);
  });
});
