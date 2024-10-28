import { gql } from "graphql-tag";

// Define the GraphQL schema using the gql template literal
const typeDefs = gql`
  type Query {
    # Query to get an array of books for the homepage grid
    books: [Book!]!
    reviews(bookId: ID!): [Review]
  }

  type Book {
    id: ID! # Unique identifier for the book
    title: String! # Title of the book
    author: Author! @relationship(type: "WROTE", direction: IN) # The author of the book
    cover: String # URL of the book's cover image
    description: String # Description or synopsis of the book
    length: Int # Length of the book in pages or other units
    modulesCount: Int # Count of modules associated with the book
    genre: String # Genres associated with the book
    publication_date: Date # Date the book was published
  }

  type Author {
    id: ID! # Unique identifier for the author
    name: String! # Name of the author
    photo: String # URL of the author's photo
    books: [Book!]! @relationship(type: "WROTE", direction: OUT) # Books written by the author
  }

  type Review {
    id: ID!
    name: String!
    stars: Int!
    comment: String!
  }

  type Mutation {
    addBook(
      title: String!
      cover: String
      length: Int
      modulesCount: Int
      authorName: String!
      authorPhoto: String
      genre: String
      publication_date: Date
      description: String
    ): Book

    addReview(bookId: ID!, name: String!, stars: Int!, comment: String!): Review
  }
`;

export default typeDefs;
