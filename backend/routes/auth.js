const express = require("express");
const checkLoginAttempts = require("../middleware/checkLoginAttempts");
const { login, signup } = require("../controller/auth");
const authRouter = express.Router();

// routes-
authRouter.post("/signup", signup);
authRouter.post("/login", checkLoginAttempts, login);

module.exports = authRouter;