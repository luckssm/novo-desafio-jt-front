const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    baseUrl: "http://localhost:3000",
    env: {
      baseUrl: "http://localhost:3000",
      baseTestAPIUrl: "https://65b98494b71048505a8aea91.mockapi.io/api/v1/",
    },
  },
});
