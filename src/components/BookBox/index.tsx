import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";
import { GET_BOOKS, GetBooksData } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import LoadingButton from "../Loading/LoadingButton";

const BookBox: React.FC = () => {
  // Apollo query
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  // Zustand store actions
  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
  const filteredBooks = useLibraryStore((state) => state.filteredBooks);
  const inputValue = useLibraryStore((state) => state.inputValue);

  // State to control number of books displayed
  const [visibleBooks, setVisibleBooks] = useState(12);

  useEffect(() => {
    setLoading(loading);
    if (error) {
      setError(error.message);
    } else if (data) {
      setBooks(data.books);
      setError(null);
    }
  }, [loading, error, data, setBooks, setLoading, setError]);

  const isInSearch = (value: string) => {
    return value.toLowerCase().includes(inputValue.toLowerCase());
  };

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 12);
  };

  if (loading) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!filteredBooks.length) return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookList}>
      {filteredBooks
        .filter((set) => isInSearch(set.title) || isInSearch(set.author.name))
        .slice(0, visibleBooks)
        .map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      
      {/* Show Load More button only if there are more books to load */}
      {visibleBooks < filteredBooks.length && (
        <LoadingButton onClick={loadMoreBooks}/>
      )}
    </section>
  );
};

export default BookBox;

