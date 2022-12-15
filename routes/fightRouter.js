const express = require("express");
const { allFighters, fightPerson, showMatches } = require("../controllers/fightController");
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

fightRouter.get("/all-fighters/:id", authenticateToken, allFighters);
fightRouter.post("/person-to-fight", authenticateToken, fightPerson)
fightRouter.get("/matches/:id", authenticateToken, showMatches)

module.exports = fightRouter;
