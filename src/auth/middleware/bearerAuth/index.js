"use strict";

const { userModel } = require("../../models");

module.exports = async (req, res, next) => {
  console.log("here1");
  if (!req.headers.authorization) {
    next("No token present");
  } else {
    console.log("here2");
    // auth string, like basic -> Bearer <token>
    let authType = req.headers.authorization.split(" ")[0];

    if (authType === "Bearer") {
      let token = req.headers.authorization.split(" ")[1];

      console.log("token:", token);
    }

    next();
  }
};
