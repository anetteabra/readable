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
import { ADD_REVIEW } from "@/queries";

const ReviewPopUp: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const MAX_WORDS = 70;
  const MAX_CHARACTERS = 400;

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
        __typename: "Review",
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    const wordCount = newComment.split(/\s+/).filter(Boolean).length;

    if (wordCount > MAX_WORDS || newComment.length > MAX_CHARACTERS) {
      setCommentError(
        `Comments can have a maximum of ${MAX_WORDS} words and ${MAX_CHARACTERS} characters.`,
      );
      return;
    }

    setComment(newComment);
    setCommentError("");
  };

  const renderStars = () => {
    return (
      <div className={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            data-testid="star"
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
        onClick={() => setPopoverOpen(true)}
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
          onChange={handleCommentChange}
          maxLength={MAX_CHARACTERS}
        />
        {commentError && <p className={styles.errorMessage}>{commentError}</p>}
        <Button
          onClick={handleSubmit}
          className={styles.submit}
          disabled={!isFormComplete || loading || !!commentError}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </PopoverContent>
    </Popover>
  );
};

export default ReviewPopUp;
