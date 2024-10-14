import { gql } from '@apollo/client';

// Define the GraphQL query
export const GET_BOOKS = gql`
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

// Define the TypeScript interfaces
export interface Book {
  id: string;
  title: string;
  author: {
    name: string;
    photo: string;
  };
  cover: string;
  length: number;
  modulesCount: number;
}

export interface GetBooksData {
  books: Book[];  // Change from tracksForHome to books
}
