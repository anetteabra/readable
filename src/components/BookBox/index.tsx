import BookCard from "../BookCard";
import styles from "./BookBox.module.css";
import {useQuery } from '@apollo/client';
import {GET_BOOKS,GetBooksData} from '../../queries';


const BookBox: React.FC = () => {

  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className={styles.bookList}>
      {data?.books.map((book: any) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
};

export default BookBox;
