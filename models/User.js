const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fightersSchema = new mongoose.Schema({
  _id: String,
  username: String,
  fname: String,
  lname: String,
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
  wins: {
    type: Number,
    required: false,
    default: 0,
  },
  imageUrl: String,
});
const matchesSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  _id: String,
  imageUrl: String,
});
const peopleToFightSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  _id: String,
  imageUrl: String,
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
  showFighters: [fightersSchema],
  imageUrl: String,
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model("User", userSchema);
