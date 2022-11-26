const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserSchema.findOne({ username });

    const compare = await user.matchPassword(password, user.password);

    if (compare) {
      res
        .status(200)
        .json({
          message: "Logged in!",
          token: generateToken(user._id),
          id: user._id,
          username: user.username,
        });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error occurred!", err });
  }
};

const register = async (req, res) => {
  try {
    const { fname, lname, email, username, password } = req.body;

    const emailExist = await UserSchema.findOne({ email });
    const usernameExist = await UserSchema.findOne({ username });

    if (emailExist) {
      return res.status(403).json({ message: "Error!, email already exist!" });
    }
    if (usernameExist) {
      return res
        .status(403)
        .json({ message: "Error!, username already exist!" });
    }

    const newUser = await UserSchema.create({
      fname,
      lname,
      email,
      username,
      password,
    });

    newUser.password = await newUser.encryptPassword(password);

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });

    await newUser.save();
  } catch (err) {
    res.status(500).json({ message: `Something went wrong!, ${err}` });
  }
};

module.exports = { register, login };
