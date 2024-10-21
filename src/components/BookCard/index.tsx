import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "./BookCard.module.css";
import { BookCardProps } from "../../queries";

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className={styles.bookCard}>
      <CardHeader className={styles.bookCardHeader}>
        <CardTitle className={styles.bookCardTitle}>{book.title}</CardTitle>
        <CardDescription className={styles.bookCardAuthor}>
          by {book.author.name}
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.bookCardContent}>
        <img
          className={styles.bookImage}
          src={book.cover}
          alt={`${book.title} cover`}
          width="150"
          height="200"
        />
        <p className={styles.bookCardDescription}>{/* {book.description} */}</p>
      </CardContent>
    </Card>
  );
}
