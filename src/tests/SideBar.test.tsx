import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import SideBar from "../components/SideBar";

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

// Mock the Zustand store
vi.mock("@/store/libraryStore", () => {
  return {
    __esModule: true,
    default: vi.fn(() => mockStore),
  };
});

describe("SideBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sidebar with sorting and filtering options", () => {
    render(<SideBar />);
    expect(
      screen.getByText("Sort and filter your library"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByText("Filter by:")).toBeInTheDocument();
    expect(screen.getByText("Favorited")).toBeInTheDocument();
    expect(screen.getByText("Genres:")).toBeInTheDocument();
  });

  it("toggles the sidebar visibility", () => {
    render(<SideBar />);
    const toggleButton = screen.getByLabelText("Open Menu");
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Close Menu")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Close Menu"));
    expect(screen.getByLabelText("Open Menu")).toBeInTheDocument();
  });

  it("calls setSortBy when a sorting option is selected", () => {
    render(<SideBar />);
    fireEvent.click(screen.getByText("Title a-z"));
    fireEvent.click(screen.getByText("Title z-a"));
    expect(mockStore.setSortBy).toHaveBeenCalledWith("Title z-a");
  });

  it("calls setFavoriteFilter when the favorited checkbox is clicked", () => {
    render(<SideBar />);

    const favoritedCheckbox = screen.getByLabelText("Favorited");
    expect(favoritedCheckbox).toBeInTheDocument();

    fireEvent.click(favoritedCheckbox);

    expect(mockStore.setFavoriteFilter).toHaveBeenCalledTimes(1);
    expect(mockStore.setFavoriteFilter).toHaveBeenCalledWith(true);
  });

  it("calls setGenreFilter when a genre is selected", () => {
    render(<SideBar />);

    const genreCheckbox = screen.getByLabelText("Fiction");
    expect(genreCheckbox).toBeInTheDocument();

    fireEvent.click(genreCheckbox);
    console.log("After first click:", mockStore.setGenreFilter.mock.calls);

    expect(mockStore.setGenreFilter).toHaveBeenCalledTimes(1);
    expect(mockStore.setGenreFilter).toHaveBeenCalledWith("Fiction");

    fireEvent.click(genreCheckbox);
    console.log("After second click:", mockStore.setGenreFilter.mock.calls);

    expect(mockStore.setGenreFilter).toHaveBeenCalledTimes(2);
    expect(mockStore.setGenreFilter).toHaveBeenCalledWith(null);
  });
});
