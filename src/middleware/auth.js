const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const jwt = require("jsonwebtoken");

const User = require("../users/model");

const hashPass = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    // bcrypt.compare takes 2 parameters, the plaintext password and the hashed password from the db
    // get user from db with the username
    // check if user exists
    // compare password
    // check if return value is true or false
    // if false response "passwords do not match"
    // attach user to the request
    // next
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.json({ message: "User does not exist" });
    }

    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(`Password Compare: ${JSON.stringify(passwordCompare)}`);

    if (!passwordCompare) {
      return res
        .status(404)
        .json({ message: "error", error: "Password is incorrect" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: error.message, error: error });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authCheck = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const checkRole = (role) => (req, res, next) => {
  if (req.authCheck.role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = {
  hashPass,
  comparePass,
  verifyToken,
  checkRole,
};
