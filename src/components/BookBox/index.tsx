import { useQuery } from '@apollo/client';
//import { useEffect, useState } from "react";
import { GET_BOOKS, GetBooksData } from '../../queries'; 
import BookCard from "../BookCard";
import styles from "./BookBox.module.css";
// import { fetchBooksFromMockData } from "./SimulateBookApi";

const BookBox: React.FC = () => {
  // Fetch data using Apollo Client
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Map data from Neo4j to the BookCard structure
  return (
    <section className={styles.bookList}>
      {data?.tracksForHome.map((book) => (
        <BookCard
          key={book.id}
          book={{
            id: parseInt(book.id, 10), // Assuming `book.id` is a string, convert to number if needed
            title: book.title,
            author: book.author.name,
            description: book.about ?? 'No description available', // Add 'about' field to your schema if it's available
            image: book.cover ?? '', // Optional chaining to handle missing cover
          }}
        />
      ))}
    </section>
  );
};

export default BookBox;

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   description: string;
//   image: string;
// }

// const BookBox: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     fetchBooksFromMockData().then((data) => setBooks(data));
//   }, []);

//   return (
//     <section className={styles.bookList}>
//       {books.map((book) => (
//         <BookCard key={book.id} book={book} />
//       ))}
//     </section>
//   );
// };

// export default BookBox;
