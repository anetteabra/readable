import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";

// Mock Zustand store
const mockStore = {
  userId: "test-user",
  books: [],
  loading: false,
  error: null,
  sortBy: "Title a-z",
  filterBy: { favorited: false, genre: null },
  favorites: [],
  inputValue: "",
  sortField: "title",
  sortOrder: "ASC",
  setBooks: vi.fn(),
  setLoading: vi.fn(),
  setError: vi.fn(),
  setSortBy: vi.fn(),
  toggleFilter: vi.fn(),
  setFavoriteFilter: vi.fn(),
  setGenreFilter: vi.fn((newGenre) => {
    mockStore.filterBy.genre = newGenre; // Update the filterBy.genre state
  }),
  toggleFavorite: vi.fn(),
  isFavorited: vi.fn(),
  sortBooks: vi.fn(),
  setInputValue: vi.fn(),
  setSortField: vi.fn(),
  setSortOrder: vi.fn(),
};

// Mock the useNavigate function from React Router
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    __esModule: true,
    default: vi.fn(() => mockStore),
  };
});

describe("SearchBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input and clear button", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>,
      );
    });

    const input = screen.getByPlaceholderText("Search for a book title");
    const button = screen.getByRole("button", { name: "Clear search" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates the input value on change", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>,
      );
    });

    const input = screen.getByPlaceholderText("Search for a book title");

    fireEvent.change(input, { target: { value: "New Book" } });
    expect(input).toHaveValue("New Book");
  });

  // Commented out test that does not run, to have it for later

  // it("calls the correct functions when Enter is pressed", async () => {
  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <SearchBar />
  //       </MemoryRouter>
  //     );
  //   });

  //   const input = screen.getByPlaceholderText("Search for a book title");

  //   await act(async () => {
  //     fireEvent.change(input, { target: { value: "Test Book" } });
  //     fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  //   });

  //   await waitFor (() => {
  //   expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
  //   expect(mockStore.setInputValue).toHaveBeenCalledWith("Test Book");
  //   expect(mockNavigate).toHaveBeenCalledWith("/library");
  //   });
  // });

  // it("clears the input and resets filters when the clear button is clicked", async () => {
  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <SearchBar />
  //       </MemoryRouter>
  //     );
  //   });

  //   const button = screen.getByRole("button", { name: /clear/i });

  //   await act(async () => {
  //     fireEvent.click(button);
  //   });
  //   // Assert that the store functions are called
  //   await waitFor(() => {
  //     expect(mockStore.setInputValue).toHaveBeenCalledWith('');
  //     expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
  //     expect(mockNavigate).toHaveBeenCalledWith('/library');
  //   });
  // });
});
