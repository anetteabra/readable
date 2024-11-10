import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";

const BookBox: React.FC = () => {
  const limit = 12;
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [initialLoad, setInitialLoad] = useState(true);
  const inputValue = useLibraryStore((state) => state.inputValue);
  const BookSort = { [sortField]: sortOrder };

  const setBooks = useLibraryStore((state) => state.setBooks);
  const books = useLibraryStore((state) => state.books);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);

  const { loading, error, data, fetchMore, refetch } = useQuery<GetBooksData>(
    GET_BOOKS,
    {
      variables: {
        options: { limit, offset: 0, sort: BookSort },
        searchTerm: inputValue,
      },
      fetchPolicy: initialLoad ? "cache-first" : "network-only", // use cache-first on initial call, or else network only
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (!initialLoad) {
      refetch();
    }
    setInitialLoad(false); // first call executed?
  }, [inputValue, refetch]);

  useEffect(() => {
    setLoading(loading);

    if (error) {
      console.error("GraphQL Error:", error.message);
      setError(error.message);
    }

    if (data && data.books) {
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

  if (loading && books.length === 0)
    return <p className={styles.loadingMessage}>Loading...</p>;
  if (error)
    return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!books.length)
    return <p className={styles.errorMessage}>No books found</p>;

  return (
    <section className={styles.bookListWrapper}>
      {" "}
      {/* Added Wrapper to enable flexbox */}
      <div className={styles.bookList}>
        {books.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {/* Sentrering av "Load More"-knappen */}
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
