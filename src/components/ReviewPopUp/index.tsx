import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import styles from "./ReviewPopUp.module.css";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "@/queries"; // Make sure this query is correct

const ReviewPopUp: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // The mutation with optimistic response and cache update
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    update(cache, { data }) {
      if (data && data.addReview) {
        cache.modify({
          fields: {
            reviews(existingReviews = []) {
              return [...existingReviews, data.addReview]; // Optimistically update cache with new review
            },
          },
        });
      }
    },
    optimisticResponse: {
      addReview: {
        name,
        stars,
        comment,
        __typename: "Review", // Ensures Apollo knows the type
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
        variables: {
          bookId,
          name,
          stars,
          comment,
        },
      });

      setName("");
      setComment("");
      setStars(0);
      setPopoverOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = () => {
    return (
      <div className={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            color={index < stars ? "#ffc107" : "#e4e5e9"}
            onClick={() => setStars(index + 1)}
            className={styles.star}
          />
        ))}
      </div>
    );
  };

  const isFormComplete =
    name.trim() !== "" && comment.trim() !== "" && stars > 0;

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        className={styles.trigger}
        onClick={() => setPopoverOpen(true)} // Open popover on trigger click
      >
        Give review
      </PopoverTrigger>
      <PopoverContent className={styles.content}>
        <h3>Give a review on this book!</h3>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={styles.nameField}
        />
        <p>How many stars for this book?</p>
        {renderStars()}
        <Textarea
          value={comment}
          placeholder="Leave a comment with your thoughts on this book"
          className={styles.textField}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          className={styles.submit}
          disabled={!isFormComplete || loading} // Disable if form is incomplete or loading
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </PopoverContent>
    </Popover>
  );
};

export default ReviewPopUp;
