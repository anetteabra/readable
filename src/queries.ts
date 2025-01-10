import { gql, useMutation } from "@apollo/client";
import { client } from "./apolloClient";

// Define the GraphQL query to get books with the new fields
export const GET_BOOKS = gql`
  query GetBooks(
    $options: BookOptions
    $searchTerm: String
    $searchTermAuthor: String
    $genre: String
    $userId: ID
  ) {
    books(
      options: $options
      where: {
        OR: [
          { title_CONTAINS: $searchTerm }
          { author: { name_CONTAINS: $searchTermAuthor } }
        ]
        AND: [{ genre_CONTAINS: $genre }, { favoritedBy: { id: $userId } }]
      }
    ) {
      cover
      description
      genre
      isbn13
      publication_date
      title
      favoritedBy {
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
  bookId: string; // The ID of the book for adding a review
}

// GET_REVIEWS query use $where
export const GET_REVIEWS = gql`
  query GetReviews($where: ReviewWhere) {
    reviews(where: $where) {
      name
      stars
      comment
    }
  }
`;

// Define the GraphQL mutation to add a new review
export const ADD_REVIEW = gql`
  mutation AddReview(
    $bookId: ID!
    $name: String!
    $stars: Int!
    $comment: String!
  ) {
    addReview(bookId: $bookId, name: $name, stars: $stars, comment: $comment) {
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
    favoriteBook(bookId: $bookId, userId: $userId) {
      id
      favorites {
        id
      }
    }
  }
`;

export const UNFAVORITE_BOOK_MUTATION = gql`
  mutation unfavoriteBook($bookId: ID!, $userId: ID!) {
    unfavoriteBook(bookId: $bookId, userId: $userId) {
      id
      favorites {
        id
      }
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites(
    $userId: ID!
    $title: String
    $genre: String
    $sort: BookSort
    $limit: Int
    $offset: Int
  ) {
    userFavorites(
      userId: $userId
      title: $title
      genre: $genre
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      id
      title
      cover
      author {
        name
      }
      genre
      publication_date
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($addUserId: ID!) {
    addUser(id: $addUserId) {
      id
    }
  }
`;

// Define the query to check if a user exists
export const CHECK_USER = gql`
  query CheckUser($userId: ID!) {
    user(id: $userId) {
      id
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

export const useAddUser = () => {
  return useMutation(ADD_USER);
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
