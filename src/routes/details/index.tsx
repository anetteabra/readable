import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client"; 
import { GET_BOOKS, Book, GetBooksData } from "../../queries"; 
import ReviewList from "@/components/ReviewList";
import ReviewPopUp from "../../components/ReviewPopUp";
import InfoDetails from "@/components/InfoDetails";
import styles from "./Details.module.css";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  useEffect(() => {
    if (data && data.books) {
      const foundBook = data.books.find((book) => book.id === id);
      setBook(foundBook || null);
    }
  }, [data, id]);

  if (loading) {
    return <div>Loading book details...</div>;
  }

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
        <ReviewList />
      </section>
      <ReviewPopUp />
    </main>
  );
};

export default Details;
