import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const [offset] = useState(0);
  const [limit] = useState(12);
  const sortField = useLibraryStore((state) => state.sortField);
  const sortOrder = useLibraryStore((state) => state.sortOrder);
  const inputValue = useLibraryStore((state) => state.inputValue);
  const genre = useLibraryStore((state) => state.filterBy.genre);
  const BookSort = { [sortField]: sortOrder };

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(
    GET_BOOKS,
    {
      variables: {
        options: { limit, offset, sort: BookSort },
        genre: genre,
        searchTerm: inputValue,
      },
    },
  );

  const setBooks = useLibraryStore((state) => state.setBooks);
  const books = useLibraryStore((state) => state.books);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);

  useEffect(() => {
    console.log("Offset value:", offset);
    console.log("Loading status:", loading);
    console.log("Sort status:", sortOrder);
    console.log("genre status:", genre);

    setLoading(loading);

    if (error) {
      console.error("GraphQL Error:", error.message);
      setError(error.message);
    } else if (data) {
      console.log("Fetched data.books:", data.books);
      setBooks(data.books);
    }
    console.log("Current books:", books);
  }, [data, loading, error, setBooks, setLoading, setError]);

  const loadMoreBooks = () => {
    fetchMore({
      variables: { options: { limit, offset: books.length, sort: BookSort } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          books: [...prevResult.books, ...fetchMoreResult.books],
        };
      },
    });
  };

  if (loading && offset === 0)
    return <p className={styles.loadingMessage}>Loading...</p>;
  if (error)
    return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!books.length)
    return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookListWrapper}>
      {" "}
      <div className={styles.bookList}>
        {books.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <button
        onClick={loadMoreBooks}
        disabled={loading}
        className={styles.loadingButton}
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </section>
  );
};

export default BookBox;
