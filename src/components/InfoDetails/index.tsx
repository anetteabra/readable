import styles from "./InfoDetails.module.css"; 

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}


interface InfoDetailsProps {
  book: Book; 
}

const InfoDetails: React.FC<InfoDetailsProps> = ({ book }) => {
  return (
    <section className={styles.bookDetails}>
      <img src={book.image} alt={book.title} className={styles.bookImage} />
      <div className={styles.bookInfo}>
        <h1> <strong>Title:</strong> {book.title}</h1>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p> <strong>Description:</strong> {book.description}</p>
      </div>
    </section>
  );
};

export default InfoDetails;
