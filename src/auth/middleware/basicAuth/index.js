// include auth stuff
const base64 = require("base-64");
const bcrypt = require("bcrypt");
// include user model to interact with database
const { userModel } = require("../../models");

const basicAuth = async (req, res, next) => {
  /*
    req.headers.authorization is : "Basic am9objpmb28="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

  if (!req.headers.authorization) {
    next("Invalid signin format");
    return;
  }

  let basicHeaderParts = req.headers.authorization.split(" "); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(":"); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */

  try {
    const user = await userModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      req.user = user;
      next();
    } else {
      next("Invalid User");
    }
  } catch (error) {
    next("Invalid Login");
  }
};

module.exports = basicAuth;