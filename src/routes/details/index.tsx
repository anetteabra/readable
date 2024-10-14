import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from "@/components/ReviewList";
import ReviewPopUp from "../../components/ReviewPopUp";
import { fetchBooksFromMockData } from "../../components/BookBox/SimulateBookApi"; // Simulert API for å hente bokdata
import styles from './Details.module.css';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Henter bok-ID fra URL-en
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Legger til loading state

  useEffect(() => {
    setLoading(true); // Starter loading når vi henter data
    // Henter spesifikk bok basert på ID
    fetchBooksFromMockData().then((data) => {
      const foundBook = data.find((book) => book.id === Number(id));
      setBook(foundBook || null);
      setLoading(false); // Data er lastet, så vi stopper loading
    });
  }, [id]);

  if (loading) {
    return <div>Loading book details...</div>; 
  }

  if (!book) {
    return <div>Book not found</div>; 
  }

  return (
    <>
      <main className={styles.detailsPage}>
        <section className={styles.bookDetails}>
          <img src={book.image} alt={book.title} className={styles.bookImage} />
          <div className={styles.bookInfo}>
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
          </div>
        </section>
        <ReviewPopUp />
        <ReviewList />
      </main>
    </>
  );
};

export default Details;
