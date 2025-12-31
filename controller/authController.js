const { prisma } = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.js");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      error: "Please enter complete details for the user registration",
    });
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const HashPassword = await bcrypt.hash(password, salt);

  // hash password
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: HashPassword,
      },
    });
    const token = generateToken(newUser?.id, res);

    return res.status(201).json({
      status: "success",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });
    const pass = bcrypt.compare(password, user?.password);
    if (!user || !pass) {
      return res.status(409).json({
        error: "Wrong credentials",
      });
    }
    const token = generateToken(user?.id, res);

    return res.status(201).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
