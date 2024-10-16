import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "../ReviewComment"; 
import styles from "./ReviewList.module.css"; 

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
    <ScrollArea className={styles.scrollArea}>
      <h1 className={styles.title}>Reviews of this book</h1>
      {reviews.map((review, index) => (
        <div key={index}>
          <Comment
            name={review.name}
            stars={review.stars}
            comment={review.comment}
          />
          {index < reviews.length - 1 && (
            <Separator className={styles.separator} />
          )}
        </div>
      ))}
    </ScrollArea>
  );
};

export default ReviewList;
