const express = require("express");
const { register, login } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.post("/register", (req, res) => {
//   const fname = req.body.fname;
//   res.json({ fname });
// });

module.exports = userRouter;
