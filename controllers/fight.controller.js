const jwt = require("jsonwebtoken");
const UserSchema = require("../models/User");
require("dotenv").config();

const allFighters = async (req, res) => {
  try {
    const { userId } = req.body;
    const allUsers = await UserSchema.find({}).select({
      username: 1,
      fname: 1,
      lname: 1,
      height: 1,
      weight: 1,
      wins: 1,
    });
    const userIndex = allUsers.findIndex(
      (person) => person._id.toString() === userId
    );
    allUsers.splice(userIndex, 1)
    return res.status(200).json({ data: allUsers });
  } catch (error) {
    return res.status(500).send({ message: "Error getting fighters!", error });
  }
};

const fightPerson = async (req, res) => {
  try {
    const { userId, personId } = req.body;

    const personToFight = await UserSchema.findOne({ _id: personId });
    const user = await UserSchema.findOne({ _id: userId });

    const validateMatch = personToFight.peopleToFight.find(
      (person) => person._id === userId
    );
    const indexObject = personToFight.peopleToFight.findIndex(
      (person) => person._id === personId
    );

    if (validateMatch) {
      personToFight.peopleToFight.splice(indexObject, 1);
      personToFight.matches.push({
        fname: user.fname,
        lname: user.lname,
        _id: user._id,
      });
      user.matches.push({
        fname: personToFight.fname,
        lname: personToFight.lname,
        _id: personToFight._id,
      });
      await personToFight.save();
      await user.save();

      return res.status(200).json({ message: "Matched" });
    }
    user.peopleToFight.push({
      fname: personToFight.fname,
      lname: personToFight.lname,
      _id: personToFight._id,
    });
    await user.save();
    return res.status(200).json({ message: "Added to people to fight" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { allFighters, fightPerson };
