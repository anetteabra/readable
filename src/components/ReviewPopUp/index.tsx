import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import styles from "./ReviewPopUp.module.css";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ReviewPopUp = () => {
    return(
    <Popover>
  <PopoverTrigger className ={styles.trigger}>Give review</PopoverTrigger>
  <PopoverContent className= {styles.content}> Give a review on this book!
    <Input placeholder="Name" className={styles.nameField}/>
    <p> <br></br> {/* bad practice, change before finishing */}
        How many stars for this book?
        <br></br>
        * * * * {/* under construction */}
    </p>
    <Textarea placeholder="Please leave a comment with your thoughts on this book" className={styles.textField}/>
    <Button className={styles.submit}>Submit</Button>
  </PopoverContent>
</Popover>
    )
};

export default ReviewPopUp;

