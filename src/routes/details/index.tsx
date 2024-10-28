import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../queries";
import ReviewList from "@/components/ReviewList";
import ReviewPopUp from "../../components/ReviewPopUp";
import InfoDetails from "@/components/InfoDetails";
import styles from "./Details.module.css";
import useLibraryStore from "../../store/libraryStore";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the book id from the route params
  const [book, setBook] = useState<Book | null>(null);

  // Access the books array from Zustand
  const books = useLibraryStore((state) => state.books);
  const loading = useLibraryStore((state) => state.loading);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find((book) => book.id === id);
      setBook(foundBook || null); // Set the book if found, otherwise null
    }
  }, [books, id]); // Trigger effect whenever books or id change

  if (loading) {
    return <div>Loading book details...</div>;
  }

  const error = useLibraryStore((state) => state.error);
  if (error) {
    return <div>Error loading book details</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <main className={styles.detailsPage}>
      <section className={styles.infoSection}>
        <InfoDetails book={book} />
      </section>
      <section className={styles.reviewsSection}>
        <ReviewList bookId={book.id} />
        <ReviewPopUp bookId={book.id} />
      </section>
    </main>
  );
};

export default Details;
