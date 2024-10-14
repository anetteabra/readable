import { useQuery, gql } from '@apollo/client';
import { GetBooksData, Book } from '../../queries';
import './book.css'; // Import the CSS file

// GraphQL query to fetch books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      cover
      length
      modulesCount
      author {
        name
        photo
      }
    }
  }
`;

// React component to display books
function Books() {
  // Execute the query with useQuery hook
  const { loading, error, data } = useQuery<GetBooksData>(GET_BOOKS);

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state
  if (error) return <p>Error: {error.message}</p>;

  // Display books once data is available
  return (
    <div className="books-container">
      {data?.books.map((book: Book) => (
        <div className="book-card" key={book.id}>
          <img src={book.cover} alt={book.title} />
          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">By: {book.author.name}</p>
            <p className="book-length">Length: {book.length} pages</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;
