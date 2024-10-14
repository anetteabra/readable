import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/project2">
        <RouterConfig />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
