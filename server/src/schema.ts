import { gql } from "graphql-tag";

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
    favoritedBy: [User!]! @relationship(type: "FAVORITED", direction: IN)
    reviews: [Review!]! @relationship(type: "REVIEWED", direction: IN)
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

  type User {
    id: ID! @unique
    favorites: [Book!]! @relationship(type: "FAVORITED", direction: OUT)
  }

  type TestSubscriber {
    id: ID! @id @unique
    name: String!
    email: String!
    Book: Book! @relationship(type: "SUBSCRIBED", direction: OUT)
  }

  type Mutation {
    addReview(
      bookId: ID!
      name: String!
      stars: Int!
      comment: String!
    ): Review!
      @cypher(
        statement: """
        MATCH (b:Book {id: $bookId})
        CREATE (r:Review {name: $name, stars: $stars, comment: $comment})
        CREATE (r)-[:REVIEWED]->(b)
        RETURN r
        """
        columnName: "r"
      )

    favoriteBook(bookId: ID!, userId: ID!): User
      @cypher(
        statement: """
        MATCH (u:User {id: $userId}), (b:Book {id: $bookId})
        MERGE (u)-[:FAVORITED]->(b)
        RETURN u
        """,
        columnName: "u"
      )

    unfavoriteBook(bookId: ID!, userId: ID!): User
      @cypher(
      statement: """
      MATCH (u:User {id: $userId})-[r:FAVORITED]->(b:Book {id: $bookId})
      DELETE r
      RETURN u
      """,
      columnName: "u"
    )

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
    
    userFavorites(
      userId: ID!
      options: BookOptions
    ): [Book!]!
      @cypher(
        statement: """
        MATCH (u:User {id: $userId})-[:FAVORITED]->(b:Book)
        RETURN b
        ORDER BY CASE WHEN $options.sort[0].title IS NOT NULL THEN b.title END, 
                 CASE WHEN $options.sort[0].publication_date IS NOT NULL THEN b.publication_date END
        SKIP $options.offset
        LIMIT $options.limit
        """,
        columnName: "b"
      )
  }
`;

export default typeDefs;
