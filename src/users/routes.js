const { Router } = require("express");
const userRouter = Router();

const {
  isData,
  isValidEmail,
  isValidPassword,
} = require("../middleware/validation");
const { register, login } = require("./controllers");

userRouter.post("/register", isData, isValidEmail, register);
userRouter.post("/login", login);
module.exports = userRouter;
