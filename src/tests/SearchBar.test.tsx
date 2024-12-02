import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
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
    mockStore.filterBy.genre = newGenre;
  }),
  toggleFavorite: vi.fn(),
  isFavorited: vi.fn(),
  sortBooks: vi.fn(),
  setInputValue: vi.fn((newValue) => {
    mockStore.inputValue = newValue; 
  }),
  setSortField: vi.fn(),
  setSortOrder: vi.fn(),
};


// Mock the useNavigate function from React Router
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
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

    const input = screen.getByPlaceholderText("Search book title or author");
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

    const input = screen.getByPlaceholderText("Search book title or author");

    fireEvent.change(input, { target: { value: "New Book" } });
    expect(input).toHaveValue("New Book");
  });

  it("updates the input value and navigates on Enter", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      );
    });
  
    const input = screen.getByPlaceholderText("Search book title or author");
  
    // Endre input-verdien
    fireEvent.change(input, { target: { value: "Test Book" } });
    expect(input).toHaveValue("Test Book");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  
    expect(mockStore.filterBy.genre).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith("/library");

  });
  
  it("clears the input and resets filters when the clear button is clicked", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      );
    });
  
    const input = screen.getByPlaceholderText("Search book title or author");
    const button = screen.getByRole("button", { name: /clear/i });
  
    fireEvent.change(input, { target: { value: "Test Book" } });
    expect(input).toHaveValue("Test Book");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.click(button);
  
  
    expect(input).toHaveValue("");
    expect(mockStore.filterBy.genre).toBe(null);
    expect(mockStore.inputValue).toBe("");
  });
  
});
