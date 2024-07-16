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
    const user = User.findOne({ where: { username } });

    if (user.password !== req.body.password) {
    }
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
