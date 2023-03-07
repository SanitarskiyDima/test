const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  pageLoadTimeout: 120000,
  e2e: {
    baseUrl: 'https://automationteststore.com',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
