import { act, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Comment from "../components/ReviewComment"; // Adjust the import path as needed

describe("ReviewComment Component", () => {
  it("renders the comment with name, stars, and comment text", () => {
    act(() => {
      render(<Comment name="John" stars={5} comment="Great book!" />);
    });

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Great book!")).toBeInTheDocument();
    expect(screen.getAllByTestId("star").length).toBe(5);
  });

  it("renders the correct number of filled and empty stars", () => {
    act(() => {
      render(<Comment name="Jane" stars={3} comment="Good read!" />);
    });

    const stars = screen.getAllByTestId("star");
    expect(stars.length).toBe(5);
    expect(stars.filter(star => star.getAttribute("color") === "#ffc107").length).toBe(3);
    expect(stars.filter(star => star.getAttribute("color") === "#e4e5e9").length).toBe(2);
  });
});