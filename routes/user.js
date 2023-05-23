"use strict";

const express = require("express");
const router = express.Router();

const bearerAuth = require("../src/auth/middleware/bearerAuth");
const { userModel } = require("../src/auth/models/");

router.get("/", bearerAuth, async (req, res) => {
  const users = await userModel.findAll();
  res.status(200).send(users);
});

module.exports = router;
