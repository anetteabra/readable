import { gql } from "graphql-tag";

// Define the GraphQL schema using the gql template literal
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
    favoritedBy: [User!]! @relationship(type: "FAVORITED", direction: IN)
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

  type User {
    id: ID! @unique
    favorites: [Book!]! @relationship(type: "FAVORITED", direction: OUT)
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

    favoriteBook(bookId: ID!, userId: ID!): User
    unfavoriteBook(bookId: ID!, userId: ID!): User

    addUser(
        id: ID!
      ): User
      @cypher(
      statement: """
      MERGE (u:User {id: $id})
      return u
      """,
      columnName: "u"
  ) 
  }

  type Query {
    user(id: ID!): User  # Add this query to fetch a single user by id
    users: [User!]!      # Retain this to fetch multiple users if needed
  }
`;

export default typeDefs;
