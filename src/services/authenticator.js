const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class Authenticator {
  async authenticate(email, password) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw { email: ["Unknown email"] };
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw { password: ["Invalid password"] };
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });

    return {
      accessToken,
    };
  }
}

module.exports = new Authenticator();
