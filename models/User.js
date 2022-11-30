const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const matchesSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  _id: String,
});
const peopleToFightSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  _id: String,
});

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
    default: 0,
  },
  weight: {
    type: Number,
    required: false,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: false,
    default: 0,
  },
  peopleToFight: [peopleToFightSchema],
  matches: [matchesSchema],
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model("User", userSchema);
