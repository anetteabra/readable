import { gql, useMutation } from "@apollo/client";
import { client } from "./apolloClient";

// Define the GraphQL query to get books with the new fields
export const GET_BOOKS = gql`
  query GetBooks($userId: ID, $options: BookOptions) {
  books(options: $options) {
    cover
    description
    genre
    id
    isbn13
    publication_date
    title
    favoritedBy(where: { id: $userId }) {
      id
    }
    author {
      name
    }
  }
  }
`;

export interface BookCardProps {
  book: Book;
  userId: string;
}

// Interface to define the expected props for the ReviewPopUp component
export interface ReviewsProps {
  bookId: string; // The ID of the book for which we're adding a review
}

// Update the GET_REVIEWS query to use $where instead of $options
export const GET_REVIEWS = gql`
  query GetReviews($where: ReviewWhere) {
    reviews(where: $where) {
      id
      name
      stars
      comment
    }
  }
`;

// Define the GraphQL mutation to add a new review
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

// Mutation to add a new book with the additional fields
export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $cover: String
    $authorName: String!
    $description: String
    $genre: String
    $publication_date: String
    $isbn13: String
  ) {
    addBook(
      title: $title
      cover: $cover
      authorName: $authorName
      description: $description
      genre: $genre
      publication_date: $publication_date
      isbn13: $isbn13
    ) {
      id
      title
      cover
      author {
        name
      }
      description
      genre
      publication_date
      isbn13
    }
  }
`;

export const FAVORITE_BOOK_MUTATION = gql`
  mutation favoriteBook($bookId: ID!, $userId: ID!) {
    updateUsers(
      where: { id: $userId }
      connect: { favorites: { where: { node: { id: $bookId } } } }
    ) {
      users {
        id
        favorites {
          id
          title
        }
      }
    }
  }
`;

export const UNFAVORITE_BOOK_MUTATION = gql`
  mutation unfavoriteBook($bookId: ID!, $userId: ID!) {
    updateUsers(
      where: { id: $userId }
      disconnect: { favorites: { where: { node: { id: $bookId } } } }
    ) {
      users {
        id
        favorites {
          id
          title
        }
      }
    }
  }
`;

// TypeScript interfaces for data and variables
export interface Book {
  id: string;
  title: string;
  cover: string;
  author: {
    name: string;
  };
  description?: string;
  genre?: string;
  publication_date?: string;
  isbn13?: string;
  favoritedBy: { id: string }[];
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  comment: string;
}

export interface GetBooksData {
  books: Book[];
}

export interface GetReviewsData {
  reviews: Review[];
}

export interface AddReviewData {
  addReview: Review;
}

export interface AddReviewVars {
  bookId: string;
  name: string;
  stars: number;
  comment: string;
}

export interface AddBookData {
  addBook: Book;
}

export interface AddBookVars {
  title: string;
  cover?: string;
  authorName: string;
  description?: string;
  genre?: string;
  publication_date?: string;
  isbn13?: string;
}

// Hook to use the AddReview mutation
export const useAddReview = () => {
  return useMutation<AddReviewData, AddReviewVars>(ADD_REVIEW);
};

// Function to favorite a book
export const favoriteBook = async (bookId: string, userId: string) => {
  return client.mutate({
    mutation: FAVORITE_BOOK_MUTATION,
    variables: { bookId, userId },
  });
};

// Function to unfavorite a book
export const unfavoriteBook = async (bookId: string, userId: string) => {
  return client.mutate({
    mutation: UNFAVORITE_BOOK_MUTATION,
    variables: { bookId, userId },
  });
};