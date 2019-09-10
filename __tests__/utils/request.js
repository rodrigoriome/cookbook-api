const defaults = require("superagent-defaults");
const supertest = require("supertest");

module.exports = app =>
  defaults(supertest(app))
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
