import { useEffect, useState } from "react";
import BookCard from '../BookCard';
import styles from './BookBox.module.css';
import { fetchBooksFromMockData } from './SimulateBookApi';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string; 
}

const BookBox: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooksFromMockData().then(data => setBooks(data));
  }, []);

  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookBox;
