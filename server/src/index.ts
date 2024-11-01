import { ApolloServer } from "@apollo/server";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import neo4j from "neo4j-driver";
import typeDefs from "./schema";
import resolvers from "./resolvers";

// Initialize Neo4j driver
const driver = neo4j.driver(
  "neo4j://it2810-34.idi.ntnu.no:7687",
  neo4j.auth.basic("neo4j", "readable"),
);

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
});

async function startApolloServer() {
  const schema = await neoSchema.getSchema();

  const server = new ApolloServer({
    schema,
    introspection: true, // Enable introspection for development
    plugins: [
      require("apollo-server-core").ApolloServerPluginLandingPageLocalDefault({
        embed: true,
      }),
    ], // Apollo Studio
  });

  // Move the context to startStandaloneServer
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ driver }), // Pass the Neo4j driver in context
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
