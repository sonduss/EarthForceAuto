module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/integration/*.js',
    MAILOSAUR_API_KEY: "EarthForceAuto",
  },
};
