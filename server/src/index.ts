import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import typeDefs from './schema';
import { stopCoverage } from 'v8';


const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(6)],
  }),
  Book: () => ({
    id: () => '_01',
    title: () => 'Little women',
    author: () => {
      return {
        name: 'Louisa May Alcott',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Louisa_May_Alcott%2C_c._1870_-_Warren%27s_Portraits%2C_Boston.jpg/800px-Louisa_May_Alcott%2C_c._1870_-_Warren%27s_Portraits%2C_Boston.jpg',
      };
    },
    cover: () => 'https://proconian.com/wp-content/uploads/2020/01/littlewomen.png',
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);
  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
