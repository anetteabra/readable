import { ApolloServer } from "@apollo/server";
import { Neo4jGraphQL } from '@neo4j/graphql';
import { startStandaloneServer } from "@apollo/server/standalone";
import neo4j from 'neo4j-driver';
import typeDefs from "./schema";

// Initialize Neo4j driver
const driver = neo4j.driver(
  'neo4j://it2810-34.idi.ntnu.no:7687',
  neo4j.auth.basic('neo4j', 'readable') 
);

// Custom resolver with logging for the books query
const resolvers = {
  Query: {
    books: async (parent, args, context, info) => {
      const session = context.driver.session(); // Create a Neo4j session
      try {
        console.log("Fetching books from Neo4j...");
        const result = await session.run(`
          MATCH (a:Author)-[:WROTE]->(b:Book)
          RETURN b {
            .id, .title, .cover, .length, .modulesCount, author: a {
              .name, .photo
            }
          } AS book
        `);
        const books = result.records.map(record => record.get('book'));
        console.log('Books fetched from Neo4j:', books);
        return books;
      } catch (error) {
        console.error('Error fetching books from Neo4j:', error);
        throw new Error('Failed to fetch books');
      } finally {
        await session.close();
      }
    },
  },
};

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers, // Add custom resolvers
  driver,
});

async function startApolloServer() {
  const schema = await neoSchema.getSchema();

  const server = new ApolloServer({
    schema,
    introspection: true,  // Enable introspection for development
    plugins: [require('apollo-server-core').ApolloServerPluginLandingPageLocalDefault({ embed: true })] // Apollo Studio
  });

  // Move the context to startStandaloneServer
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ driver }),  // Pass the Neo4j driver in context
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
