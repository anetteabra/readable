import styles from "./InfoDetails.module.css";
import { Book as BookType } from "../../queries";

interface InfoDetailsProps {
  book: BookType;
}

const InfoDetails: React.FC<InfoDetailsProps> = ({ book }) => {
  return (
    <section className={styles.bookDetails}>
      <img src={book.cover} alt={book.title} className={styles.bookImage} />
      <div className={styles.bookInfo}>
        <h1>
          <strong>Title:</strong> {book.title}
        </h1>
        <p>
          <strong>Author:</strong> {book.author.name}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Publication date:</strong> {book.publication_date}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
      </div>
    </section>
  );
};

export default InfoDetails;
