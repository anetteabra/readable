import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3001", // Ensure this points to your GraphQL endpoint
    headers: {
      "Content-Type": "application/json", // Specify the content type
      "x-apollo-operation-name": "default", // Optional: Set a default operation name
      "apollo-require-preflight": "true",  // Optional: Helps bypass CSRF checks
    },
  }),
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };
