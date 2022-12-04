const express = require("express");
const { register, login } = require("../controllers/userController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register)
userRouter.post("/login", login);

module.exports = userRouter;
