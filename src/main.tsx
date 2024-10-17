import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider
import { client } from "./apolloClient"; // Import Apollo Client instance
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {" "}
      {/* Wrap your app with ApolloProvider */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/project2">
          <RouterConfig />
        </BrowserRouter>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import RouterConfig from "./routes";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./global.css";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter basename='/project2'>
//         <RouterConfig />
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>,
// );
