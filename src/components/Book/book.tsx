import { useEffect } from "react";
import useLibraryStore from "@/store/libraryStore";
import styles from "./book.module.css"; // Import the CSS file
import { Book, GET_BOOKS, GetBooksData } from "@/queries";
import { useQuery } from "@apollo/client";

// React component to display books
function Books() {
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  // Zustand store actions
  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);

  // Get books from Zustand store
  const books = useLibraryStore((state) => state.books);

  // When the data, loading, or error state changes, update Zustand store
  useEffect(() => {
    // Only update Zustand state if it's actually different
  if (loading !== useLibraryStore.getState().loading) {
    setLoading(loading);
  }
  if (error && error.message !== useLibraryStore.getState().error) {
    setError(error.message);
  } else if (data) {
    setBooks(data.books);
    setError(null);
  }
}, [loading, error, data, setBooks, setLoading, setError]);

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state
  if (error) return <p>Error: {error.message}</p>;

  // Display books once data is available
  return (
    <div className={styles.bookContainer}>
      {books.map((book: Book) => (
        <div className={styles.bookCard} key={book.id}>
          <img src={book.cover} alt={book.title} />
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>By: {book.author.name}</p>
            <p className={styles.bookLength}>Length: {book.length} pages</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;
