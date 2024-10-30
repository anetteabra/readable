import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const [offset, setOffset] = useState(0); // State to manage pagination offset
  const limit = 12;

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(GET_BOOKS, {
    variables: { options: { limit, offset } },
  });

  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
  const filteredBooks = useLibraryStore((state) => state.filteredBooks);

  useEffect(() => {
    setLoading(loading);

    if (error) {
      setError(error.message);
    } else if (data) {
      setBooks(data.books);
      setError(null);
    }
  }, [loading, error, data, setBooks, setLoading, setError]);

  const loadMoreBooks = () => {
    setOffset(offset + limit); // Increase offset by limit for pagination
    fetchMore({
      variables: { options: { limit, offset: offset + limit } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          books: [...prevResult.books, ...fetchMoreResult.books], // Append new books
        };
      },
    });
  };

  if (loading && offset === 0) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!filteredBooks.length) return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookList}>
      {filteredBooks.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <button onClick={loadMoreBooks} disabled={loading} className={styles.loadMoreButton}>
        {loading ? "Loading..." : "Load More Books"}
      </button>
    </section>
  );
};

export default BookBox;
