const { Router } = require("express");
const userRouter = Router();

const {
  isData,
  isValidEmail,
  isValidPassword,
} = require("../middleware/validation");

const {
  hashPass,
  comparePass,
  verifyToken,
  checkRole,
} = require("../middleware/auth");

const { register, login, verifyTokenController } = require("./controllers");

userRouter.post("/register", hashPass, register);
userRouter.post("/login", comparePass, login);
userRouter.get("/verify-token", verifyToken, verifyTokenController);
userRouter.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.status(200).json({ message: "You are an admin!" });
});
module.exports = userRouter;
