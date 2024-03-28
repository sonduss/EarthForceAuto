module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: 'https://portal.dev.earthforce.io/portal/overview',
      },
    specPattern:'cypress/integration/*.js',
  },
};
