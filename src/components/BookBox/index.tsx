import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData, Book } from "../../queries";
import useLibraryStore from "../../store/libraryStore";
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";
import { Button } from "../ui/button";

const BookBox: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 12;
  const filteredBooks = useLibraryStore((state) => state.filteredBooks); // Access filteredBooks from the store
  const setBooks = useLibraryStore((state) => state.setBooks);
  const setLoading = useLibraryStore((state) => state.setLoading);
  const setError = useLibraryStore((state) => state.setError);

  const { loading, error, data, fetchMore } = useQuery<GetBooksData>(GET_BOOKS, {
    variables: { options: { limit, offset } },
  });
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

  const loadMoreBooks = () => {
    const newOffset = offset + 12;
    setOffset(newOffset);

    fetchMore({
      variables: { options: { limit, offset: newOffset } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
      
        // Extract the previous and newly fetched books
        const prevBooks = prevResult.books;
        const newBooks = fetchMoreResult.books;
      
        // Create a Set of existing book IDs to ensure uniqueness
        const existingIds = new Set(prevBooks.map((book) => book.id));
      
        // Filter out duplicates from the new books
        const uniqueNewBooks = newBooks.filter((book) => !existingIds.has(book.id));
      
        // Return the combined, unique list of books
        return {
          books: [...prevBooks, ...uniqueNewBooks],
        };
      }
    });
  };

  if (loading && offset === 0) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>Error: {error.message}</p>;
  if (!filteredBooks.length) return <p className={styles.errorMessage}>No books found</p>;

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
      .map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <div className={styles.buttonContainer}>
        <Button onClick={loadMoreBooks} disabled={loading} className={styles.loadingButton}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </section>
  );
};

export default BookBox;