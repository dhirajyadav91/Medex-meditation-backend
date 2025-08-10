const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register controller
const registerController = async (req, res) => {
  const {name,email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authModel.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    res.status(200).json({
      success: true,
      msg: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "User already exists",
      error: error.message,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      msg: "Login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = { registerController,loginController };
