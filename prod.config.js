module.exports = {
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      env: {
      
        CYPRESS_ENVIRONMENT: "production",
  
      },
      baseUrl: 'https://portal.earthforce.io/portal/overview',
      specPattern: 'cypress/integration/*.js',
    },
  };
  