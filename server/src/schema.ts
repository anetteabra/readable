import { gql } from "graphql-tag";
/* const gql = require('graphql-tag'); */

const typeDefs = gql`
  type Query {
    # Query to get tracks array for the homepage grid
    tracksForHome: [Book!]!
  }

  # A track is a group of Modules that teaches about a specific topic
  type Book {
    id: ID!
    title: String!
    author: Author!
    cover: String
    about: String
    length: Int
    modulesCount: Int
  }

  # Author of a complete Track or a Module
  type Author {
    id: ID!
    name: String!
    photo: String
  }
`;

export default typeDefs;
