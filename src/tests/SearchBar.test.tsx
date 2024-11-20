import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";


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
    mockStore.filterBy.genre = newGenre; // update the filterBy.genre state
  }),
  toggleFavorite: vi.fn(),
  isFavorited: vi.fn(),
  sortBooks: vi.fn(),
  setInputValue: vi.fn(),
  setSortField: vi.fn(),
  setSortOrder: vi.fn(),
};



// Mock the actual module with vi.importActual and override useNavigate
const mockNavigate = vi.fn();
/*vi.mock('@/store/libraryStore', () => {
  return {
    __esModule: true,
    default: vi.fn(() => mockStore),
  };
}); */

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual, // Spread the actual implementation
    __esModule: true, // Ensure ES module compatibility
    useNavigate: () => mockNavigate, // Mock `useNavigate`
  };
});

describe("SearchBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("renders the input and x button", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for a book title");
    const button = screen.getByRole("button", { name: "Clear search"});

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates the input value on change", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for a book title");

    fireEvent.change(input, { target: { value: "New Book" } });
    expect(input).toHaveValue("New Book");
  });

  it("calls the correct functions when Enter is pressed", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for a book title");

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: 'Test Book' } });

    // Simulate pressing "Enter"
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    setTimeout(() => {
      expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
      expect(mockStore.setInputValue).toHaveBeenCalledWith("Test Book");
      expect(mockNavigate).toHaveBeenCalledWith("/library");
    }, 10);
  });

  it("clears the input and resets filters when the x button is clicked", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Clear search" });
   

    // Simulate clicking the clear button
    fireEvent.click(button);

    // Verify that the necessary store functions were called

    setTimeout(() => {
      expect(mockStore.setInputValue).toHaveBeenCalledWith("");
      expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
      expect(mockStore.setFavoriteFilter).toHaveBeenCalledWith(false);;
    }, 10);
  });
  
});
