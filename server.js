const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fightRouter = require("./routes/fightRouter");
const geoRouter = require("./routes/geoLocationRouter");

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Error!\n", err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/geolocation", geoRouter);
app.use("/fight", fightRouter);
app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
