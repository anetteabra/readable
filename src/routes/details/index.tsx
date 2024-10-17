import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "@/components/ReviewList";
import ReviewPopUp from "../../components/ReviewPopUp";
import { fetchBooksFromMockData } from "../../components/BookBox/SimulateBookApi";
import InfoDetails from "@/components/InfoDetails";
import styles from "./Details.module.css";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchBooksFromMockData().then((data) => {
      const foundBook = data.find((book) => book.id === Number(id));
      setBook(foundBook || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading book details...</div>;
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
