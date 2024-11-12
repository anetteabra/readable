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
        <CardTitle className={styles.bookCardTitle}>{book.title}</CardTitle>
        <CardDescription className={styles.bookCardAuthor}>
          by {book.author.name}
        </CardDescription>
      </CardHeader>
      <Link to={`/details/${book.id}`} className={styles.bookCardLink}>
        <CardContent className={styles.bookCardContent}>
          <img
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
