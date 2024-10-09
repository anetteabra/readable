import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "./BookCard.module.css";

// Can change the params when database is up
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className={styles.bookCard}>
      <CardHeader className={styles.bookCardHeader}>
        <CardTitle className={styles.bookCardTitle}>{book.title}</CardTitle>
        <CardDescription className={styles.bookCardAuthor}>
          by {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.bookCardContent}>
        <img
          className={styles.bookImage}
          src={book.image}
          alt={`${book.title} cover`}
          width="150"
          height="200"
        />
        <p className={styles.bookCardDescription}>{book.description}</p>
      </CardContent>
    </Card>
  );
}
