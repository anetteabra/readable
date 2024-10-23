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
import { ADD_REVIEW, ReviewsProps } from "@/queries";
import { useMutation } from "@apollo/client";

const ReviewPopUp: React.FC<ReviewsProps> = ({ bookId }) => {
  const [addReview, {loading, error }] = useMutation(ADD_REVIEW);
  const [popoverOpen, setPopoverOpen] = useState(false); // Control Popover open state
  const [stars, setStars] = useState(0); // State to hold the selected star rating
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

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
      // Keep the popover open
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
            className={styles.star} // Add a class for potential styling
          />
        ))}
      </div>
    );
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger 
        className={styles.trigger}
        onClick={() => setPopoverOpen(true)} // Open popover on trigger click
      >
        Give review
      </PopoverTrigger>
      <PopoverContent className={styles.content}>
        Give a review on this book!
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className={styles.nameField}
        />
        <p>How many stars for this book?</p>
        {renderStars()}
        <Textarea
          value={comment}
          placeholder="Please leave a comment with your thoughts on this book"
          className={styles.textField}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          className={styles.submit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </PopoverContent>
    </Popover>
  );
};

export default ReviewPopUp;

