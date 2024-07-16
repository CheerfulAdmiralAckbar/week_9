const { Router } = require("express");
const userRouter = Router();

const {
  isData,
  isValidEmail,
  isValidPassword,
} = require("../middleware/validation");

const { hashPass, comparePass } = require("../middleware/auth");

const { register, login } = require("./controllers");

userRouter.post("/register", hashPass, register);
userRouter.post("/login", comparePass, login);
module.exports = userRouter;
