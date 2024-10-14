import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Apollo Server URL
  cache: new InMemoryCache(),
});

export { ApolloProvider, client }; // Export ApolloProvider and client for direct use