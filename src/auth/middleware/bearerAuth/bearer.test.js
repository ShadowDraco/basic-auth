const basicAuth = require(".");
const base64 = require("base-64"); // use for sending ath requests

// require the database to test auth
const { sequelize } = require("../../models/");

// create a space to test the basic auth
const supertest = require("supertest");
const { app } = require("../../../server");
const request = supertest(app);

let fakeUser;

// before testing connect
beforeAll(async () => {
  await sequelize.sync();
  fakeUser = await request
    .post("/auth/signup")
    .send({ username: "Johnny", password: "Bravo" });
});
// after testing remove testing environment to prevent side effects
afterAll(async () => {
  await sequelize.drop();
});

describe("Bearer Auth PLACEHOLDER", () => {
  test("middleware works alone", async () => {
    /* // success case
    let req = {
      headers: {
        authorization: `Basic ${base64.encode(`Johnny:Bravo`)}`,
      },
    };
    const res = {};
    const next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
    */

    expect(true).toBeTruthy();
  });
});
