import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Replace with your local development server URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
