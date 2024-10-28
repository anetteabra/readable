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
import { ADD_REVIEW, GET_REVIEWS, ReviewsProps } from "@/queries";
import { useMutation } from "@apollo/client";

const ReviewPopUp: React.FC<ReviewsProps> = ({ bookId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false); // Control Popover open state
  const [stars, setStars] = useState(0); // State to hold the selected star rating
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Modify the useMutation hook to include the update function
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        // Read the current list of reviews from the cache
        const existingReviews: any = cache.readQuery({
          query: GET_REVIEWS,
          variables: { bookId },
        });

        // Write the new review into the cache
        cache.writeQuery({
          query: GET_REVIEWS,
          variables: { bookId },
          data: {
            reviews: [...existingReviews.reviews, addReview], // Append the new review to the cache
          },
        });
      } catch (error) {
        console.error("Error updating cache: ", error);
      }
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
      // Optionally clear form fields after submission
      setName("");
      setComment("");
      setStars(0);
      // Close the popover
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
            onClick={() => setStars(index + 1)} // Update stars state on click
            className={styles.star}
          />
        ))}
      </div>
    );
  };

  // Disable Submit button if any field is empty or stars are not selected
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
