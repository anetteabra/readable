// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { afterEach, describe, expect, it, vi } from "vitest";
// import BookBox from "../components/BookBox";
// import useLibraryStore from "../store/libraryStore";  // Importer Zustand store

// // Mock Zustand store
// vi.mock("../store/libraryStore", () => ({
//   __esModule: true,
//   default: vi.fn(() => ({
//     books: [
//       {
//         id: "1",
//         title: "Book 1",
//         author: { name: "Author 1" },
//         genre: "Genre 1",
//         publication_date: "2021",
//         description: "Description 1",
//         cover: "/cover1.jpg",
//       },
//       {
//         id: "2",
//         title: "Book 2",
//         author: { name: "Author 2" },
//         genre: "Genre 2",
//         publication_date: "2022",
//         description: "Description 2",
//         cover: "/cover2.jpg",
//       },
//     ],
//     loading: false,
//     error: null,
//     sortField: "title",
//     sortOrder: "ASC",
//     sortBy: "Title a-z",
//     filterBy: { favorited: false, genre: "" },
//     favorites: [],
//     isFavorited: (bookId: string) => false,
//     setBooks: vi.fn(),
//     setLoading: vi.fn(),
//     setError: vi.fn(),
//     setSortBy: vi.fn(),
//     toggleFilter: vi.fn(),
//     setFavoriteFilter: vi.fn(),
//     setGenreFilter: vi.fn(),
//     toggleFavorite: vi.fn(),
//     sortBooks: vi.fn(),
//     inputValue: "",
//     setInputValue: vi.fn(),
//     setSortField: vi.fn(),
//     setSortOrder: vi.fn(),
//   })),
// }));

// describe("BookBox Component", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it("renders loading message when data is being fetched", () => {
//     // Mocking Zustand store to simulate loading state
//     useLibraryStore.mockReturnValue({
//       books: [],
//       loading: true,
//       error: null,
//       setBooks: vi.fn(),
//       setLoading: vi.fn(),
//       setError: vi.fn(),
//     });

//     render(<BookBox />);

//     // Check if loading message is rendered
//     expect(screen.getByText(/loading.../i)).toBeInTheDocument();
//   });

//   it("renders error message when there is an error", () => {
//     // Mocking Zustand store to simulate error state
//     useLibraryStore.mockReturnValue({
//       books: [],
//       loading: false,
//       error: { message: "GraphQL error" },
//       setBooks: vi.fn(),
//       setLoading: vi.fn(),
//       setError: vi.fn(),
//     });

//     render(<BookBox />);

//     // Check if error message is rendered
//     expect(screen.getByText(/Error: GraphQL error/i)).toBeInTheDocument();
//   });

//   it("renders 'No books found' when there are no books", () => {
//     // Mocking Zustand store to simulate empty books state
//     useLibraryStore.mockReturnValue({
//       books: [],
//       loading: false,
//       error: null,
//       setBooks: vi.fn(),
//       setLoading: vi.fn(),
//       setError: vi.fn(),
//     });

//     render(<BookBox />);

//     // Check if 'No books found' message is rendered
//     expect(screen.getByText(/No books found/i)).toBeInTheDocument();
//   });

//   it("renders books correctly when data is available", () => {
//     render(<BookBox />);

//     // Check if books are rendered correctly
//     expect(screen.getByText("Book 1")).toBeInTheDocument();
//     expect(screen.getByText("Book 2")).toBeInTheDocument();
//     expect(screen.getByText("Author 1")).toBeInTheDocument();
//     expect(screen.getByText("Author 2")).toBeInTheDocument();
//   });

//   it("calls toggleFavorite when 'Add to Favorites' is clicked", () => {
//     // Mock Zustand store to test favorite toggle functionality
//     const toggleFavoriteMock = vi.fn();
//     useLibraryStore.mockReturnValue({
//       books: [
//         {
//           id: "1",
//           title: "Book 1",
//           author: { name: "Author 1" },
//           genre: "Genre 1",
//           publication_date: "2021",
//           description: "Description 1",
//           cover: "/cover1.jpg",
//         },
//       ],
//       loading: false,
//       error: null,
//       toggleFavorite: toggleFavoriteMock,
//       setBooks: vi.fn(),
//       setLoading: vi.fn(),
//       setError: vi.fn(),
//     });

//     render(<BookBox />);

//     // Simulate clicking 'Add to Favorites' button
//     fireEvent.click(screen.getByText(/Add to Favorites/i));

//     // Ensure toggleFavorite was called
//     expect(toggleFavoriteMock).toHaveBeenCalled();
//   });

//   it("calls fetchMore when 'Load More' is clicked", async () => {
//     // Create a mock for fetchMore function
//     const fetchMoreMock = vi.fn();
//     useLibraryStore.mockReturnValue({
//       books: [
//         {
//           id: "1",
//           title: "Book 1",
//           author: { name: "Author 1" },
//           genre: "Genre 1",
//           publication_date: "2021",
//           description: "Description 1",
//           cover: "/cover1.jpg",
//         },
//       ],
//       loading: false,
//       error: null,
//       fetchMore: fetchMoreMock,
//       setBooks: vi.fn(),
//       setLoading: vi.fn(),
//       setError: vi.fn(),
//     });

//     render(<BookBox />);

//     // Simulate clicking 'Load More' button
//     fireEvent.click(screen.getByText(/Load more/i));

//     // Ensure fetchMore was called
//     await waitFor(() => expect(fetchMoreMock).toHaveBeenCalled());
//   });
// });
 