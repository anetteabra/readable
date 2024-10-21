import { gql } from '@apollo/client';

// Define the GraphQL query
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      cover
      length
      author {
        name
        photo
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($bookId: ID!) {
    reviews(bookId: $bookId) {
      id
      name
      stars
      comment
    }
  }
`;

// Define the TypeScript interfaces
export interface Book {
  id: string;
  title: string;
  author: {
    name: string;
  };
  cover: string;
  length: number;
}

export interface BookCardProps {
  book: Book;
} 


export interface GetBooksData {
  books: Book[];  // Change from tracksForHome to books
}

export interface AddReview{
  bookId:string;
  name: string;
  stars: number;
  comment: string;
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  comment: string;
}

export interface ReviewsProps {
  bookId: string; 
}


export const ADD_REVIEW = gql`
  mutation AddReview($bookId: ID!, $name: String!, $stars: Int!, $comment: String!) {
    addReview(bookId: $bookId, name: $name, stars: $stars, comment: $comment) {
      id
      name
      stars
      comment
    }
  }
`;

