"use strict";

const supertest = require("supertest");

// require app so we can test it
const app = require("../src/server");
// create a test for app using super test
const request = supertest(app);

describe("Server", () => {
  test("placeholder test", () => {
    expect(true).toBeTruthy();
  });
});
