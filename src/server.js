"use strict";

// Prepare the express app
const express = require("express");
const app = express();
const cors = require("cors");

//use global middleware
app.use(cors());
// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Home Route!");
});

// import custom route
const authRoute = require("./auth/router");

// use custom routes
app.use("/auth", authRoute);
//app.use(authRoute); // also works to remove extra route

const start = (port) => {
  app.listen(port, () => {
    console.log("listening on port: ", port);
  });
};

module.exports = { start, app };
