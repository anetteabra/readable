const resolvers = {
  Query: {
    books: () => null, // Delegates handling to Neo4j GraphQL library
    reviews: () => null, // Delegates handling to Neo4j GraphQL library
  },
};

export default resolvers;