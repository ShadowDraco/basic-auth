"use strict";

module.exports = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "That route was not found!",
    solution: "Please check your route, and method (CRUD)",
  });
};
