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
import useLibraryStore from "@/store/libraryStore";

export default function BookCard({ book }: BookCardProps) {
  
  // const isFavorited = book.favoritedBy.some((user) => user.id === userId);
  const userId = useLibraryStore((state) => state.userId);
  const isFavorited = useLibraryStore((state) => state.isFavorited(book.id));

  return (
    <Card className={styles.bookCard}>
      <CardHeader className={styles.bookCardHeader}>
        {/* <div className={styles.faveButton} aria-label="Favorite book">
          <FaveButton bookId={book.id} isFavorited={isFavorited} />
        </div>  */}
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
          {/* <p className={styles.bookCardDescription}>{book.description}</p>
          <p className={styles.bookCardGenre}>Genre: {book.genre}</p>
          <p className={styles.bookCardPublicationDate}>
            Published: {book.publication_date}
          </p> */}
          {/* <p className={styles.bookCardISBN}>ISBN-13: {book.isbn13}</p> */}
        </CardContent>
      </Link>
    </Card>
  );
}
