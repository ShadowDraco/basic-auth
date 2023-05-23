"use strict";

const jwt = require("jsonwebtoken");
const SIGNATURE = process.env.SIGNATURE;

// Create a Sequelize model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        // when accessing the user, generate a virtual token to be passed with it, but not added to database
        return jwt.sign({ username: this.username }, SIGNATURE, {
          expiresIn: 1000 * 60 * 60,
        }); // never include password in a token payload
      },
    },
  });

  User.authenticateBearer = async (token) => {
    try {
      let payload = jwt.verify(token, SIGNATURE);
      console.log("payload:", payload);

      // little user = UserModel
      const user = await User.findOne({
        where: { username: payload.username },
      });

      if (user) return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return User;
};
