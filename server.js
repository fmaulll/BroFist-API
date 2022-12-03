const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fightRouter = require("./routes/fight.router");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Error!\n", err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

app.use("/fight", fightRouter);
app.use("/auth", userRouter);
app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file.path;
  console.log(file);
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
