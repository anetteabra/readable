import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 12;
  const [existingBooksArray, setExistingBooksArray] = useState<Book[]>([]); // Array to store BookCard components
  
  const userId = useLibraryStore((state) => state.userId);
  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(GET_BOOKS, {
    variables: { userId, options: { limit, offset } },
  });

  // Helper function to append unique books
  const appendUniqueBooksToArray = (newBooks: Book[]) => {
    const existingIds = new Set(existingBooksArray.map((bookCard) => bookCard.key));
    const uniqueBooks = newBooks.filter((book) => !existingIds.has(book.id));

    const newBookCards = uniqueBooks.map((book: Book) => (
      <BookCard key={book.id} book={book} userId={userId} />
    ));

    setExistingBooksArray((prevArray) => [...prevArray, ...newBookCards]);
  };
  
  // const appendUniqueBooks = (newBooks: Book[]) => {
  //   const existingIds = new Set(existingBooksArray.map((book) => book.id));
  //   const uniqueBooks = newBooks.filter((book) => !existingIds.has(book.id));
  //   setExistingBooksArray((prev) => [...prev, ...uniqueBooks]);
  // };


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
      appendUniqueBooks(data.books);
    }
  }, [loading, error, data, setBooks, setLoading, setError]);

  const loadMoreBooks = () => {
    const newOffset = offset + limit; // Increase offset for pagination

    setOffset(newOffset);

    fetchMore({
      variables: {
        userId,
        options: { limit, offset: newOffset },
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
  
        // Combine previous and newly fetched books
        return {
          books: [...prevResult.books, ...fetchMoreResult.books],
        };
      },
    });
  };

  if (loading && offset === 0) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!existingBooksArray.length) return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookList}>
      {existingBooksArray.map((book: Book) => (
        <BookCard key={book.id} book={book} userId={userId} />
      ))}
      <button onClick={loadMoreBooks} disabled={loading} className={styles.loadMoreButton}>
        {loading ? "Loading..." : "Load More Books"}
      </button>
    </section>
  );
};

export default BookBox;