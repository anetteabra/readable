import BookCard from "../BookCard";
import styles from "./BookBox.module.css";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_BOOKS, GetBooksData } from "../../queries";
import useLibraryStore from "../../store/libraryStore";

const BookBox: React.FC = () => {
  // Apollo query
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  // Zustand store actions
  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
  const filteredBooks = useLibraryStore((state) => state.filteredBooks); // Use Zustand state for sorted and filtered books
  const inputValue = useLibraryStore((state) => state.inputValue); 

  useEffect(() => {
    setLoading(loading);
   
    if (error) {
      setError(error.message);
    } else if (data) {
      setBooks(data.books); // set books in zustand store
      setError(null);
    }
  }, [loading, error, data, setBooks, setLoading, setError]);

  if (loading) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error)
    return <p className={styles.errorMessage}>Error: {error.message}</p>;

  if (!filteredBooks.length) {
    return <p className={styles.errorMessage}> No books found </p>;
  }

  const isInSearch = (value: string) => {
    return value.toLowerCase().includes(inputValue.toLowerCase());
  };


  return (
    <section className={styles.bookList}>
      {filteredBooks
        .filter(
          (set) =>
            isInSearch(set.title) || 
            isInSearch(set.author.name)
        )
      .map((book: any) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
};

export default BookBox;
