import styles from "./InfoDetails.module.css";
import { Book as BookType } from "../../queries"; 

interface InfoDetailsProps {
  book: BookType; // Use the updated Book type from GraphQL
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
        {/* <img src={book.author.photo} alt={book.author.name} className={styles.authorPhoto} /> */}
        <p>
          {/* <strong>Description:</strong> {book.description} */}
        </p>
      </div>
    </section>
  );
};

export default InfoDetails;
