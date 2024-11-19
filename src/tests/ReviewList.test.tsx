import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import ReviewList from "../components/ReviewList"; // Adjust the import path as needed
import { GET_REVIEWS } from "@/queries"; // Adjust the import path as needed

const mocks = [
  {
    request: {
      query: GET_REVIEWS,
      variables: {
        where: { book: { id: "1" } },
      },
    },
    result: {
      data: {
        reviews: [
          {
            id: "1",
            name: "John",
            stars: 5,
            comment: "Great book!",
          },
          {
            id: "2",
            name: "Jane",
            stars: 4,
            comment: "Enjoyed it!",
          },
        ],
      },
    },
  },
];

describe("ReviewList Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewList bookId="1" />
      </MockedProvider>
    );

    expect(screen.getByText("Loading reviews...")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_REVIEWS,
          variables: {
            where: { book: { id: "1" } },
          },
        },
        error: new Error("An error occurred"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ReviewList bookId="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error: An error occurred")).toBeInTheDocument();
    });
  });

  it("renders reviews", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewList bookId="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Great book!")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Enjoyed it!")).toBeInTheDocument();
    });
  });
});