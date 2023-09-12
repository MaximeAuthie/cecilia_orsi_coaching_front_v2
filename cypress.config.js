const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    admin_email : process.env.ADMIN_EMAIL,
    admin_password : process.env.ADMIN_PASSWORD
  }
});
