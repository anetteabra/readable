import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi, afterEach } from "vitest";
import ReviewPopUp from "../components/ReviewPopUp";
import { ADD_REVIEW } from "@/queries";

const mocks = [
  {
    request: {
      query: ADD_REVIEW,
      variables: {
        bookId: "1",
        name: "Ola Nordmann",
        stars: 5,
        comment: "Great book!",
      },
    },
    result: {
      data: {
        addReview: {
          __typename: "Review",
          name: "Ola Nordmann",
          stars: 5,
          comment: "Great book!",
        },
      },
    },
  },
];

describe("ReviewPopUp Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the ReviewPopUp component", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ReviewPopUp bookId="1" />
        </MockedProvider>,
      );
    });

    expect(screen.getByText("Give review")).toBeInTheDocument();
  });

  it("opens the popover when the trigger is clicked", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ReviewPopUp bookId="1" />
        </MockedProvider>,
      );
    });

    const trigger = screen.getByText("Give review");
    await act(async () => {
      userEvent.click(trigger);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Give a review on this book!"),
      ).toBeInTheDocument();
    });
  });

  it("submits the review form", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ReviewPopUp bookId="1" />
        </MockedProvider>,
      );
    });

    const trigger = screen.getByText("Give review");

    await act(async () => {
      userEvent.click(trigger);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Give a review on this book!"),
      ).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText("Your name");
    const commentTextarea = screen.getByPlaceholderText(
      "Leave a comment with your thoughts on this book",
    );
    const stars = screen.getAllByTestId("star");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      await userEvent.type(nameInput, "Ola Nordmann");
      await userEvent.type(commentTextarea, "Great book!");
      await userEvent.click(stars[4]);
    });

    await waitFor(() => {
      expect(nameInput).toHaveValue("Ola Nordmann");
      expect(commentTextarea).toHaveValue("Great book!");
      expect(submitButton).not.toBeDisabled();
    });

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
    });
  });
});
