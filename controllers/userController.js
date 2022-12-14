const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = require("../models/User");

let refreshTokens = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const token = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401);

  if (!refreshTokens.includes(refreshToken)) return res.status(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateToken(user._id);
    res.json({ accessToken: accessToken });
  });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserSchema.findOne({ username });

    if (!user) return res.status(404).send({ message: "Username not found!" });

    const compare = await user.matchPassword(password, user.password);

    const accessToken = generateToken(user._id);
    // const refreshToken = jwt.sign(user._id, process.env.JWT_SECRET_REFRESH);
    // refreshTokens.push(refreshToken);

    if (compare) {
      res.status(200).json({
        message: "Logged in!",
        token: accessToken,
        // refreshToken: refreshToken,
        id: user._id,
        username: user.username,
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      username,
      password,
      height,
      weight,
      province,
      city,
    } = req.body;
    const filePath = req.file.path
      .split("")
      .splice(7, req.file.path.length)
      .join("");

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

    const allUsers = await UserSchema.find({}).select({
      username: 1,
      fname: 1,
      lname: 1,
      height: 1,
      weight: 1,
      wins: 1,
      imageUrl: 1,
      province: 1,
      city: 1,
    });

    const newUser = await UserSchema.create({
      fname,
      lname,
      email,
      username,
      password,
      height,
      weight,
      imageUrl: `${process.env.API_URL}/${filePath}`,
      province,
      city,
    });

    newUser.password = await newUser.encryptPassword(password);

    await UserSchema.updateMany(
      {},
      {
        showFighters: [
          ...allUsers,
          {
            _id: newUser._id,
            fname: newUser.fname,
            lname: newUser.lname,
            username: newUser.username,
            height: newUser.height,
            weight: newUser.weight,
            imageUrl: newUser.imageUrl,
            province: newUser.province,
            city: newUser.city,
          },
        ],
      }
    );

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.username,
      email: newUser.email,
    });

    await newUser.save();
  } catch (error) {
    res.status(500).json({ message: `Something went wrong!, ${error}` });
  }
};

module.exports = { token, register, login };
