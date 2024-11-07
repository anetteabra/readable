import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const [offset, setOffset] = useState(0); 
  const [limit, setLimit] = useState(12);
  const [sortField,setSortField]= useState("title");
  const [sortOrder, setSortOrder]= useState("ASC");
  const inputValue = useLibraryStore((state) => state.inputValue);
  const BookSort = {[sortField]: sortOrder };
 /*  const [existingBooksArray, setExistingBooksArray] = useState<JSX.Element[]>([]); */ // Array to store BookCard components

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(GET_BOOKS, {
    variables: { options: { limit, offset, sort: BookSort
      },  searchTerm: inputValue},
  });

  const setBooks = useLibraryStore((state) => state.setBooks);
  const books = useLibraryStore((state) => state.books);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
 
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


        // Combine previous and newly fetched books for the store
        return {
          books: [...prevResult.books, ...fetchMoreResult.books], // Append new books
        };
      },
    });
  };

  if (loading && offset === 0) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!books.length) return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookList}>
      {books
        .map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      <button onClick={loadMoreBooks} disabled={loading} className={styles.loadMoreButton}>
        {loading ? "Loading..." : "Load More Books"}
      </button>
    </section>
  );
};

export default BookBox;