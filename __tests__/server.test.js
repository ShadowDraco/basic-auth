"use strict";

const supertest = require("supertest");
const base64 = require("base-64"); // use for sending requests to server
const authorize = require("../src/auth/middleware/basicAuth");
// require the database to test it
const { sequelize } = require("../src/auth/models/.");
// require app so we can test it
const { app } = require("../src/server");
// create a test for app using super test
const request = supertest(app);

// before testing connect
beforeAll(async () => {
  await sequelize.sync();
});
// after testing remove testing environment to prevent sid effects
afterAll(async () => {
  await sequelize.drop();
});

describe("Server", () => {
  it("is healthy", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("handles auth route", async () => {
    let response = await request.get("/auth");
    expect(response.status).toBe(200);
  });

  test("handles signup route", async () => {
    const response = await request
      .post("/auth/signup")
      .send({ username: "Johnny", password: "Bravo" });

    expect(response.status).toEqual(201);
  });

  test("handles signin route", async () => {
    const response = await request
      .post("/auth/signin")
      .set({ Authorization: `Basic ${base64.encode(`Johnny:Bravo`)}` });

    expect(response.status).toEqual(200);
  });

  test("auth middleware works alone", async () => {
    // success case
    let req = {
      headers: {
        authorization: `Basic ${base64.encode(`Johnny:Bravo`)}`,
      },
    };
    const res = {};
    const next = jest.fn();

    await authorize(req, res, next);
    expect(next).toHaveBeenCalledWith();

    // invalid password case
    req = {
      headers: {
        authorization: `Basic ${base64.encode(`Johnny:Bravado`)}`,
      },
    };

    await authorize(req, res, next);
    expect(next).toHaveBeenCalledWith("Invalid User");

    // invalid user case
    req = {
      headers: {
        authorization: `Basic ${base64.encode(`Joe:Bravo`)}`,
      },
    };

    await authorize(req, res, next);
    expect(next).toHaveBeenCalledWith("Invalid Login");

    // invalid header case
    req = {
      headers: {},
    };

    await authorize(req, res, next);
    expect(next).toHaveBeenCalledWith("Invalid signin format");
  });

  test("handles not found", async () => {
    const response = await request.get("/birds");
    expect(response.body.message).toEqual("That route was not found!");
  });

  test("handles general errors", async () => {
    const response = await request.post("/auth/signin").send({
      blah: "blah",
      wah: "wah",
    });
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual("That's a server error :/");
  });
});
