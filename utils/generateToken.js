const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (userId, res) => {
  const payload = { id: userId };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //saves from CSRF
    maxAge: 1000 * 60 * 60 * 24 * 7, //stored in milliseconds
  });
  return token;
};
