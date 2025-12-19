const express = require("express");
const { AsyncHandler } = require("../../utils/async-handler");
const bcrypt = require("bcrypt")
const Router = express.Router();

router.post(
  "/login",
  authMiddleWare,
  AsyncHandler(async (req, res) => {
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

module.exports = router;
