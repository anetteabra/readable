import { ApolloServer } from "@apollo/server";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import neo4j, { Driver } from "neo4j-driver";
import typeDefs from "./schema";

const driver: Driver = neo4j.driver(
  "neo4j://it2810-34.idi.ntnu.no:7687",
  neo4j.auth.basic("neo4j", "readable"),
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

async function startApolloServer(): Promise<void> {
  try {
    const schema = await neoSchema.getSchema(); // Generate schema with built-in resolvers

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ApolloServerPluginLandingPageLocalDefault = require("apollo-server-core").ApolloServerPluginLandingPageLocalDefault;

    const server = new ApolloServer({
      schema,
      introspection: true, // Enable introspection for development
      formatError: (error) => {
        console.error("GraphQL Error:", error);
        return error; // Pass error details to the client for troubleshooting
      },
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
            embed: true,
          },
        ),
      ],
    });

    const { url } = await startStandaloneServer(server, {
      context: async () => ({ driver }), // Pass the Neo4j driver in context
      listen: { port: 3001 },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to start Apollo Server:", error);
    process.exit(1); // Exit to avoid leaving the server in an unstable state
  }
}

// Call the function with .catch to handle any unhandled promise rejections
startApolloServer().catch((error: unknown) => {
  console.error("Unhandled error starting Apollo server:", error);
});
