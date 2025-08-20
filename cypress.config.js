const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--ignore-certificate-errors");
          return launchOptions;
        }
      });
    },

    
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    
    baseUrl: "http://localhost:3000",

    
    specPattern: "cypress/integration/tests/**/*.spec.js",
  },
});
