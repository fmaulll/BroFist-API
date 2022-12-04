const express = require("express");
const geoRouter = express.Router();
const { getProvince, getCity } = require("../controllers/geoLocationController");

geoRouter.get("/province", getProvince);
geoRouter.post("/city", getCity);

module.exports = geoRouter;
