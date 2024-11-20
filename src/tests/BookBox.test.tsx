import { act, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BookBox from "../components/BookBox";
import { GET_BOOKS } from "@/queries";

const mocks = [
  {
    request: {
      query: GET_BOOKS,
      variables: {
        options: { limit: 12, offset: 0, sort: { title: "ASC" } },
        genre: "",
        searchTerm: "",
        userId: undefined,
      },
    },
    result: {
      data: {
        books: [
          {
            id: "1",
            title: "Book 1",
            author: { name: "Author 1" },
            genre: "Genre 1",
            publication_date: "2021",
            description: "Description 1",
            cover: "/cover1.jpg",
            isbn13: "1234567890123",
            favoritedBy: [],
          },
          {
            id: "2",
            title: "Book 2",
            author: { name: "Author 2" },
            genre: "Genre 2",
            publication_date: "2022",
            description: "Description 2",
            cover: "/cover2.jpg",
            isbn13: "1234567890124",
            favoritedBy: [],
          },
        ],
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_BOOKS,
      variables: {
        options: { limit: 12, offset: 0, sort: { title: "ASC" } },
        genre: "",
        searchTerm: "",
        userId: undefined,
      },
    },
    error: new Error("An error occurred"),
  },
];

describe("BookBox Component", () => {
  it("renders the BookBox component", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <BookBox />
          </MockedProvider>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();

      expect(screen.getByText("Book 2")).toBeInTheDocument();
    });
  });

  it("renders error message when there is an error", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <MockedProvider mocks={errorMocks} addTypename={false}>
            <BookBox />
          </MockedProvider>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Error: An error occurred")).toBeInTheDocument();
    });
  });
});
