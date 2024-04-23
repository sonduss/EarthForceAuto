module.exports = {
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      env: {
        baseUrlProd:"https://api.earthforce.io/portal/main-api",
        CYPRESS_ENVIRONMENT: "production"
      },
      baseUrl: 'https://portal.earthforce.io/portal/overview',
      specPattern: 'cypress/integration/*.js',
    },
  };
  