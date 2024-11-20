import { defineConfig } from "cypress";

// cypress.config.ts
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/project2",
    setupNodeEvents(on, config) {
      console.log("Setup Node Events", { on, config });
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});