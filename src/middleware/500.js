"use strict";

module.exports = (error, req, res, next) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  res.status(500).json({
    status: 500,
    message: "That's a server error :/",
    route: req.url,
    method: req.method,
    error: errorMessage,
  });
};
