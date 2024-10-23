import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "./BookCard.module.css";
import { BookCardProps } from "../../queries";
import FaveButton from "../FaveButton";

// Can change the params when database is up
/* export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}*/

/* interface BookCardProps {
  book: Book;
}  */

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/details/${book.id}`} className={styles.bookCardLink}>
    <Card className={styles.bookCard}>
      <CardHeader className={styles.bookCardHeader}>
        <div className={styles.faveButton} aria-label="Favorite book">
          <FaveButton bookId={book.id} />
        </div>

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
  </Link>
  );
}
