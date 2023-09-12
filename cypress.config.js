const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    admin_email:      process.env.ADMIN_EMAIL,
    admin_password:   process.env.ADMIN_PASSWORD,
    valid_token:      process.env.VALID_TOKEN,
    invalid_token:    process.env.INVALID_TOKEN,
    expired_token:    process.env.EXPIRED_TOKEN,
    valid_user:       process.env.VALID_USER,
    invalid_user:     process.env.INVALID_USER
  }
});
