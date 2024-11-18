import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../queries";
import ReviewList from "@/components/ReviewList";
import ReviewPopUp from "../../components/ReviewPopUp";
import InfoDetails from "@/components/InfoDetails";
import styles from "./Details.module.css";
import useLibraryStore from "../../store/libraryStore";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const books = useLibraryStore((state) => state.books);
  const loading = useLibraryStore((state) => state.loading);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find((book) => book.id === id);
      setBook(foundBook || null);
    }
  }, [books, id]);

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
    <main className={styles.detailsPage} aria-label="details page">
      <section className={styles.infoSection} aria-label="info section">
        <InfoDetails book={book} />
      </section>
      <section className={styles.reviewsSection} aria-label="review section">
        <ReviewList bookId={book.id} aria-label="review list" />
        <ReviewPopUp bookId={book.id} aria-label="review popup" />
      </section>
    </main>
  );
};

export default Details;
