import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://it2810-34.idi.ntnu.no:3001",
  headers: {
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };
