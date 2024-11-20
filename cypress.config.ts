import { defineConfig } from "cypress";

// cypress.config.ts
export default {
  e2e: {
    baseUrl: 'http://localhost:5173/project2',
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
};