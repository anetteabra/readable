import { gql } from "graphql-tag";

// Define the GraphQL schema using the gql template literal
const typeDefs = gql`

  type Book {
    id: ID! @id @unique
    title: String! # Title of the book
    author: Author! @relationship(type: "WROTE", direction: IN) # The author of the book
    cover: String # URL of the book's cover image
    description: String # Description or synopsis of the book
    genre: String
    publication_date: String
    isbn13: String
    reviews: [Review!]! @relationship(type: "REVIEWED", direction: IN)
  }

  type Author {
    id: ID! @id @unique
    name: String! # Name of the author
    books: [Book!]! @relationship(type: "WROTE", direction: OUT) # Books written by the author
  }

  type Review {
    id: ID! @id @unique
    name: String!
    stars: Int!
    comment: String!
    book: Book! @relationship(type: "REVIEWED", direction: OUT)
  }
  
  type TestSubscriber {
    id: ID! @id @unique
    name: String!
    email: String!
    Book: Book! @relationship(type: "SUBSCRIBED", direction: OUT)
  }
  
  type Mutation {
    addReview(
      bookId: ID!,
      name: String!,
      stars: Int!,
      comment: String!
    ): Review!
    @cypher(
      statement: """
        MATCH (b:Book {id: $bookId})
        CREATE (r:Review {name: $name, stars: $stars, comment: $comment})
        CREATE (r)-[:REVIEWS]->(b)
        RETURN r
      """,
      columnName: "r"
      )
  }
`;

export default typeDefs;
