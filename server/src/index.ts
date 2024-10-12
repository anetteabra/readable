import { ApolloServer } from "@apollo/server";
import { Neo4jGraphQL } from '@neo4j/graphql';
import { startStandaloneServer } from "@apollo/server/standalone";
//import { makeExecutableSchema } from "@graphql-tools/schema";
// import { addMocksToSchema } from "@graphql-tools/mock";
import neo4j from 'neo4j-driver';
import typeDefs from "./schema";
//import { stopCoverage } from "v8";

const driver = neo4j.driver(
  'bolt://<NEO4J_HOST>', // use the correct URL for your Neo4j instance
  neo4j.auth.basic('<USERNAME>', '<PASSWORD>')
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

async function startApolloServer() {
  const schema = await neoSchema.getSchema();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server);

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
  `);
}


// const mocks = {
//   Query: () => ({
//     tracksForHome: () => [...new Array(6)],
//   }),
//   Book: () => ({
//     id: () => "_01",
//     title: () => "Little women",
//     author: () => {
//       return {
//         name: "Louisa May Alcott",
//         photo:
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Louisa_May_Alcott%2C_c._1870_-_Warren%27s_Portraits%2C_Boston.jpg/800px-Louisa_May_Alcott%2C_c._1870_-_Warren%27s_Portraits%2C_Boston.jpg",
//       };
//     },
//     cover: () =>
//       "https://proconian.com/wp-content/uploads/2020/01/littlewomen.png",
//     length: () => 1210,
//     modulesCount: () => 6,
//   }),
// };

// async function startApolloServer() {
//   const server = new ApolloServer({
//     schema: addMocksToSchema({
//       schema: makeExecutableSchema({ typeDefs }),
//       mocks,
//     }),
//   });
//   const { url } = await startStandaloneServer(server);
//   console.log(`
//       🚀  Server is running
//       📭  Query at ${url}
//     `);
// }

startApolloServer();
