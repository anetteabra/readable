import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "../ReviewComment";
import styles from "./ReviewList.module.css";
import { GET_REVIEWS, Review, ReviewsProps } from "@/queries";
import { useQuery } from "@apollo/client";


/* const reviews = [
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
]; */

const ReviewList: React.FC <ReviewsProps> = ({ bookId }) => {
  const { loading, error, data } = useQuery<{ reviews: Review[] }>(GET_REVIEWS, {
    variables: { bookId },
  });

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <> 
    <ScrollArea className={styles.scrollArea}>
      <h1 className={styles.title}>Reviews of this book</h1>
      {data?.reviews.map((review, index) => (
        <div key={index}>
          <Comment
            name={review.name}
            stars={review.stars}
            comment={review.comment}
          />
          {index < data.reviews.length - 1 && (
            <Separator className={styles.separator} />
          )}
        </div>
      ))}
    </ScrollArea>
    </>
  );
};

export default ReviewList;
