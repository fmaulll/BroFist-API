const express = require("express");
const { allFighters, fightPerson } = require("../controllers/fight.controller");
const fightRouter = express.Router();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

fightRouter.get("/all-fighters", authenticateToken, allFighters);
fightRouter.post("/person-to-fight", authenticateToken, fightPerson)

module.exports = fightRouter;
