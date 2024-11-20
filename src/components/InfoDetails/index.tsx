import styles from "./InfoDetails.module.css";
import { Book as BookType } from "../../queries";

interface InfoDetailsProps {
  book: BookType;
}

const InfoDetails: React.FC<InfoDetailsProps> = ({ book }) => {
  return (
    <section className={styles.bookDetails} aria-label="Book details">
      <img
        src={book.cover}
        alt={book.title}
        className={styles.bookImage}
        aria-label="Book cover image"
      />
      <div className={styles.bookInfo} aria-label="Book information">
        <h1 data-cy="book-title">
          <strong>Title:</strong> {book.title}
        </h1>
        <p data-cy="book-author">
          <strong>Author:</strong> {book.author.name}
        </p>
        <p data-cy="book-genre">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p data-cy="book-publication-date">
          <strong>Publication date:</strong> {book.publication_date}
        </p>
        <p data-cy="book-description">
          <strong>Description:</strong> {book.description}
        </p>
      </div>
    </section>
  );
};

export default InfoDetails;
