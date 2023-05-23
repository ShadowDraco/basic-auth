"use strict";

// prepare env and database
require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
// include schemas
const User = require("./user-model");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

// prepare sequelize
const sequelize = new Sequelize(DATABASE_URL);

const userModel = User(sequelize, DataTypes);

module.exports = { sequelize, userModel };
