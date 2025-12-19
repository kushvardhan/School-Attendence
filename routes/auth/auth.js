const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const { AsyncTryCatchHandler } = require("../../utils/async-handler");

router.post(
  "/register",
  AsyncTryCatchHandler(async (req, res) => {
    const { name, email, password, rollNo } = req.body;

    if (!name || !email || !password || !rollNo) {
      return res.status(400).json({
        error: "All fields data are required",
      });
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      rollNo,
    });

    if (!newUser) {
      return res.status(400).json({
        error: "Error while registering user",
      });
    }

    req.session.user = {
      id: newUser._id,
      email: newUser.email,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        rollNo: newUser.rollNo,
      },
    });
  })
);

router.post(
  "/login",
  authMiddleWare,
  AsyncTryCatchHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all the fields" });
    }

    const isValidUser = await User.findOne({ email });

    if (!isValidUser) {
      return res.status(400).json({ error: "User does not exist. Signup !!" });
    }

    const decryptPassword = await bcrypt.compare(
      password,
      isValidUser.password
    );

    if (!decryptPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    res.status(200).json({
      message: "You are successfully logged in",
    });
  })
);

router.post("/logout",AsyncTryCatchHandler(async(req,res)=>{
    req.session.destroy(() => {
    res.clearCookie("user-session");
    res.status(200).json({ message: "Logged out successfully" });
  });
}))

module.exports = router;
