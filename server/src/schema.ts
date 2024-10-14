import { gql } from "graphql-tag";

// Define the GraphQL schema using the gql template literal
const typeDefs = gql`
  # The root Query type
  type Query {
    # Query to get an array of books for the homepage grid
    books: [Book!]! # Updated to match the books query structure
  }

  # A Book is a resource that has associated details
  type Book {
    id: ID!                  # Unique identifier for the book
    title: String!            # Title of the book
    author: Author! @relationship(type: "WROTE", direction: IN) # The author of the book
    cover: String             # URL of the book's cover image
    about: String             # Description or synopsis of the book
    length: Int               # Length of the book in pages or other units
    modulesCount: Int         # Count of modules associated with the book
  }

  # An Author represents the creator of a Book
  type Author {
    id: ID!                   # Unique identifier for the author
    name: String!             # Name of the author
    photo: String             # URL of the author's photo
    books: [Book!]! @relationship(type: "WROTE", direction: OUT) # Books written by the author
  }
`;

export default typeDefs;
