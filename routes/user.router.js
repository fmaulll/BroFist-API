const express = require("express");
const { register, login } = require("../controllers/user.controller");
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

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register)
// userRouter.post("/register", upload.single("image"), async (req, res) => {
  // try {
    // const { fname, lname, email, username, password, height, weight } = req.body;

    // console.log(fname)
    // console.log(req.file.path)
    

    // const emailExist = await UserSchema.findOne({ email });
    // const usernameExist = await UserSchema.findOne({ username });

    // if (emailExist) {
    //   return res.status(403).json({ message: "Error!, email already exist!" });
    // }
    // if (usernameExist) {
    //   return res
    //     .status(403)
    //     .json({ message: "Error!, username already exist!" });
    // }

    // const allUsers = await UserSchema.find({}).select({
    //   username: 1,
    //   fname: 1,
    //   lname: 1,
    //   height: 1,
    //   weight: 1,
    //   wins: 1,
    //   ImageUrl: 1
    // });

    // const newUser = await UserSchema.create({
    //   fname,
    //   lname,
    //   email,
    //   username,
    //   password,
    //   height,
    //   weight,
    //   ImageUrl: req.file.path,
    // });

    // newUser.password = await newUser.encryptPassword(password);

    // await UserSchema.updateMany(
    //   {},
    //   {
    //     showFighters: [
    //       ...allUsers,
    //       {
    //         _id: newUser._id,
    //         fname: newUser.fname,
    //         lname: newUser.lname,
    //         username: newUser.username,
    //         height: newUser.height,
    //         weight: newUser.weight,
    //       },
    //     ],
    //   }
    // );

    // res.status(201).json({
    //   _id: newUser._id,
    //   userName: newUser.username,
    //   email: newUser.email,
    // });

    // await newUser.save();
  // } catch (error) {
    // res.status(500).json({ message: `Something went wrong!, ${error}` });
  // }
// });
userRouter.post("/login", login);

module.exports = userRouter;
