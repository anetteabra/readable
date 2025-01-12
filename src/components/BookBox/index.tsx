import { useQuery } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
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

  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  const userId = useLibraryStore((state) => state.userId);
  const setBooks = useLibraryStore((state) => state.setBooks);
  const books = useLibraryStore((state) => state.books);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);
  const { filterBy, favorites } = useLibraryStore();

  const capitalizeWords = (str: string) => {
    if (!str) return str;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetBooksData>(
    GET_BOOKS,
    {
      variables: {
        options: { limit, offset, sort: BookSort },
        genre: genre,
        searchTerm: inputValue.toUpperCase(),
        searchTermAuthor: capitalizeWords(inputValue),
        userId: filterBy.favorited ? userId : undefined,
      },
    },
  );

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
      if (data.books.length < limit) {
        setHasMoreBooks(false);
      }
      if (!(data.books.length < limit)) {
        setHasMoreBooks(true);
      }
    }
    console.log("Current books:", books);
  }, [
    data,
    loading,
    error,
    offset,
    sortOrder,
    genre,
    books,
    setBooks,
    setLoading,
    setError,
    limit,
  ]);

  // Memoized filtered list based on the latest favorites
  const filteredBooks = useMemo(() => {
    return filterBy.favorited
      ? books.filter((book) => favorites.includes(book.id))
      : books;
  }, [books, favorites, filterBy.favorited]);

  // Re-fetch books when the favorited filter changes
  useEffect(() => {
    refetch();
  }, [filterBy.favorited, refetch]);

  const loadMoreBooks = () => {
    fetchMore({
      variables: { options: { limit, offset: books.length, sort: BookSort } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        const newBooks = filterBy.favorited
          ? fetchMoreResult.books.filter((book) => favorites.includes(book.id))
          : fetchMoreResult.books;
        if (newBooks.length < limit) {
          setHasMoreBooks(false);
        }
        const uniqueBooks = [
          ...new Map(
            [...prevResult.books, ...newBooks].map((book) => [book.id, book]),
          ).values(),
        ];
        return {
          books: uniqueBooks,
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
      <div className={styles.bookList} data-cy="book-list">
        {filteredBooks.map((book: Book) => (
          <BookCard key={book.id} book={book} userId={userId} />
        ))}
      </div>
      {hasMoreBooks && (
        <button
          onClick={loadMoreBooks}
          disabled={loading}
          className={styles.loadingButton}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
};

export default BookBox;
