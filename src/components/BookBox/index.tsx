import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const [offset, setOffset] = useState(0); // State to manage pagination offset
  const [limit, setLimit] = useState(12);  // Initial limit is 12
  const [existingBooksArray, setExistingBooksArray] = useState<JSX.Element[]>([]); // Array to store BookCard components

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(GET_BOOKS, {
    variables: { options: { limit, offset } },
  });

  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
  const filteredBooks = useLibraryStore((state) => state.filteredBooks);

  // Helper function to append unique books
  const appendUniqueBooksToArray = (newBooks: Book[]) => {
    const existingIds = new Set(existingBooksArray.map((bookCard) => bookCard.key));
    const uniqueBooks = newBooks.filter((book) => !existingIds.has(book.id));

    const newBookCards = uniqueBooks.map((book: Book) => (
      <BookCard key={book.id} book={book} />
    ));

    setExistingBooksArray((prevArray) => [...prevArray, ...newBookCards]);
  };

  useEffect(() => {
    console.log("Offset value:", offset);
    console.log("Loading status:", loading);

    setLoading(loading);

    if (error) {
      console.error("Error message:", error.message);
      setError(error.message);
    } else if (data) {
      console.log("Fetched data.books:", data.books);
      setBooks(data.books); // Update the store with new books

      // Add these books to the existingBooksArray
      appendUniqueBooksToArray(data.books);
    }
  }, [loading, error, data, setBooks, setLoading, setError]);

  const loadMoreBooks = () => {
    const newLimit = limit + 12;  // Increase limit by 12
    const newOffset = offset + 12; // Increase offset by 12

    setLimit(newLimit);
    setOffset(newOffset);

    fetchMore({
      variables: { options: { limit: newLimit, offset: newOffset } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        // Log to see what books are being combined
        console.log("prevResult.books:", prevResult.books);
        console.log("fetchMoreResult.books:", fetchMoreResult.books);

        // Append unique books to the existingBooksArray
        appendUniqueBooksToArray(fetchMoreResult.books);

        // Combine previous and newly fetched books for the store
        return {
          books: [...prevResult.books, ...fetchMoreResult.books], // Append new books
        };
      },
    });
  };

  if (loading && offset === 0) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!existingBooksArray.length) return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookList}>
      {existingBooksArray}
      <button onClick={loadMoreBooks} disabled={loading} className={styles.loadMoreButton}>
        {loading ? "Loading..." : "Load More Books"}
      </button>
    </section>
  );
};

export default BookBox;