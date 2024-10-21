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

const ReviewPopUp = () => {
  const [stars, setStars] = useState(0); // State to hold the selected star rating

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
    <Popover>
      <PopoverTrigger className={styles.trigger}>Give review</PopoverTrigger>
      <PopoverContent className={styles.content}>
        Give a review on this book!
        <Input placeholder="Name" className={styles.nameField} />
        <p>How many stars for this book?</p>
        {renderStars()}
        <Textarea
          placeholder="Please leave a comment with your thoughts on this book"
          className={styles.textField}
        />
        <Button className={styles.submit}>Submit</Button>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewPopUp;
