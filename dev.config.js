module.exports = {
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      env: {
        baseUrlDev: "https://api.dev.earthforce.io/portal/main-api",
        CYPRESS_ENVIRONMENT: "dev"
  
      },
      baseUrl: 'https://portal.dev.earthforce.io/portal/overview',
      specPattern: 'cypress/integration/contacts.js',
    },
  };
  