module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   
    baseUrl: 'https://portal.dev.earthforce.io/portal/',
    specPattern: 'cypress/integration/*.js',
  },
};
