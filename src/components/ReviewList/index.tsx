import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "../ReviewComment"; // Import your Comment component

const reviews = [
  {
    name: "John Doe",
    stars: 5,
    comment: "Excellent book, highly recommended!",
  },
  {
    name: "Jane Smith",
    stars: 4,
    comment: "Very insightful, but some chapters were too long.",
  },
  {
    name: "Mark Wilson",
    stars: 3,
    comment: "Not as engaging as I hoped.",
  },
  {
    name: "Alice Johnson",
    stars: 4,
    comment: "Good read, but could be shorter.",
  },
  {
    name: "Bob Brown",
    stars: 5,
    comment: "A must-read for anyone interested in the subject!",
  },
];

const ReviewList: React.FC = () => {
  return (
    <ScrollArea
      // still need to redo this
      style={{
        height: "300px",
        width: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "16px",
          fontSize: "18px",
          color: "#333",
        }}
      >
        List of Reviews
      </h1>
      {reviews.map((review, index) => (
        <div key={index}>
          <Comment
            name={review.name}
            stars={review.stars}
            comment={review.comment}
          />
          {index < reviews.length - 1 && (
            <Separator style={{ margin: "16px 0" }} />
          )}
        </div>
      ))}
    </ScrollArea>
  );
};

export default ReviewList;
