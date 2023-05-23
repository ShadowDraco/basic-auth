"use strict";

const { start } = require("./src/server");

// 3rd Party Resources
require("dotenv").config();
const PORT = process.env.PORT;

// make sure our tables are created, start up the HTTP server.
const { sequelize } = require("./src/auth/models/");

sequelize
  .sync()
  .then(() => {
    console.log("database connected");
    start(PORT);
  })
  .catch((e) => {
    console.error("Could not start server", e.message);
  });
