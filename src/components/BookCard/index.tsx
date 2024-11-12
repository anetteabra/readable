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

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className={styles.bookCard}>
      <CardHeader className={styles.bookCardHeader}>
        <div className={styles.faveButton} aria-label="Favorite book">
          <FaveButton bookId={book.id} />
        </div>
        <CardTitle className={styles.bookCardTitle} aria-label="Book title">{book.title}</CardTitle>
        <CardDescription className={styles.bookCardAuthor} aria-label="Book description and author">
          by {book.author.name}
        </CardDescription>
      </CardHeader>
      <Link to={`/details/${book.id}`} className={styles.bookCardLink} aria-label="Link to details page">
        <CardContent className={styles.bookCardContent}>
          <img aria-label="Book cover image"
            className={styles.bookImage}
            src={book.cover}
            alt={`${book.title} cover`}
            width="150"
            height="200"
          />
        </CardContent>
      </Link>
    </Card>
  );
}
