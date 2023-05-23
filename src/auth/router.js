"use strict";

const express = require("express");
const router = express.Router();
// include auth stuff
const bcrypt = require("bcrypt");
// include auth function
const basicAuth = require("./middleware/basicAuth");
// include user model
const { userModel } = require("./models");

router.get("/", (req, res) => {
  res.status(200).send("Auth Route!");
});

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post("/signup", async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);

    res.status(201).json(record);
  } catch (e) {
    console.log(e);
    res.status(403).send("Error Creating User");
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post("/signin", basicAuth, async (req, res) => {
  req.user ? res.status(200).json(req.user) : next("Login failed");
});

module.exports = router;
