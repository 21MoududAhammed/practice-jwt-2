const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
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
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const { password: hashedPassword, _id, ...rest } = user._doc;
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Authentication Failed!" });
    }
    const token = await jwt.sign({ userName, _id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful ", token, data: { _id, ...rest } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

module.exports = { registerUser, loginUser };
