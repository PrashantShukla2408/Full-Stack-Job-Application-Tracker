const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists, Please Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      user: User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, Please sign up" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password, Please try again" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETKEY);

    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.profile = async (req, res) => {
  const userId = req.userId;
  const { profileInfo, careerGoals } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profileInfo = profileInfo;
    user.careerGoals = careerGoals;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        message: "User details fetched successfully",
        name: user.name,
        profileInfo: user.profileInfo,
        careerGoals: user.careerGoals,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
