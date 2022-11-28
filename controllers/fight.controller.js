const jwt = require("jsonwebtoken");
const UserSchema = require("../models/User");
require("dotenv").config();

const allFighters = async (req, res) => {
  try {
    const allUsers = await UserSchema.find().select({
      username: 1,
      fname: 1,
      lname: 1,
      height: 1,
      weight: 1,
      wins: 1,
    });
    res.status(200).json({ data: allUsers });
  } catch (err) {
    res.status(500).send({ message: "Error getting fighters!", err });
  }
};

module.exports = { allFighters };
