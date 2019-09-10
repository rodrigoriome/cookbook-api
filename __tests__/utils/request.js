const defaults = require("superagent-defaults");
const supertest = require("supertest");

// supertest won't send post requests without proper headers
module.exports = app =>
  defaults(supertest(app))
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
