const User = require("./model");

const register = async (req, res) => {
  const username = req.body.username.toLowerCase();
  try {
    const user = await User.create({
      username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: "success", body: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    res.status(201).json({ message: "success", body: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message, error: error });
  }
};

module.exports = {
  register,
  login,
};
