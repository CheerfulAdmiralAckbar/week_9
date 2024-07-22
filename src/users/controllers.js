const User = require("./model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log("register middleware hit and username: ", req.body.username);
  const username = req.body.username.toLowerCase();
  try {
    const user = await User.create({
      username,
      email: req.body.email,
      password: req.body.password,
      role: "admin",
    });
    res.status(201).json({ message: "success", body: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    const token = await jwt.sign(
      { id: req.user.id, username: req.user.username, role: req.user.role },
      process.env.JWT_SECRET
    );

    const user = {
      id: req.user.id,
      username: req.user.username,
      token: token,
      role: req.user.role,
    };
    res.status(201).json({ message: "success", user });
  } catch (error) {
    res.status(400).json({ error, message: error.message, type: "failure" });
  }
};

const verifyTokenController = (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
};

module.exports = {
  register,
  login,
  verifyTokenController,
};
