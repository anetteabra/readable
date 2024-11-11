import { gql } from "graphql-tag";

const typeDefs = gql`

  type Book {
    id: ID! # Unique identifier for the book
    title: String! # Title of the book
    author: Author! @relationship(type: "WROTE", direction: IN) # The author of the book
    cover: String # URL of the book's cover image
    description: String # Description or synopsis of the book
    genre: String
    publication_date: String
    isbn13: String
  }
  

  input BookOptions {
    limit: Int
    offset: Int
    sort: [BookSort!] # Array of sorting criteria
  }

  input BookSort {
    title: SortDirection
   publication_date : SortDirection
  }
  
 
  type Author {
    id: ID! # Unique identifier for the author
    name: String! # Name of the author
    books: [Book!]! @relationship(type: "WROTE", direction: OUT) # Books written by the author
  }

  type Review {
    id: ID!
    name: String!
    stars: Int!
    comment: String!
    book: Book! @relationship(type: "REVIEWED", direction: OUT)
  }

  type Mutation {
    addBook(
      title: String!,
      cover: String,
      authorName: String!,
      description: String,
      genre: String,
      publication_date: String,
      isbn13: String
    ): Book

    addReview(bookId: ID!, name: String!, stars: Int!, comment: String!): Review
  }
`;

export default typeDefs;
