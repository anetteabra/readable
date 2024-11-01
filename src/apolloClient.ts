import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001", 
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };
