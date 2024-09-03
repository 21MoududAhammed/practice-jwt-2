const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, userName, password, isAdmin } = req.body;
    // input validation
    if (!name || !userName || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    // check if user is already exists
    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ message: "UserName already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      name,
      userName,
      password: hashedPassword,
      isAdmin,
    });
    if (!result) {
      return res.status(500).json({ message: "Register failed." });
    }

    const { password: userPassword, ...rest } = result._doc;

    res.status(201).json({ message: "Register Successful!", data: rest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

module.exports = router;
