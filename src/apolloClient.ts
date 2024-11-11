import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };
