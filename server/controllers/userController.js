import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import mongoose from "mongoose";
import collectionModel from "../models/collectionModel.js";

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  try {
    // Get the info
    const { email, username, password, verifyPassword } = req.body;

    // Validate all fields are not null
    if (!email || !username || !password || !verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // If email already exists return false: user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate that the email is valid, otherwise return false: email is invalid
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is invalid" });
    }

    // Validate that the passwords are the same and strong
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 characters or more",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one special character (!, @, #, $, %, &, *)",
      });
    }

    if (password != verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to the database
    const newUser = new userModel({
      name: username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    // Get the user's info
    const { email, password } = req.body;

    // Check to see that the email exists in the database
    const user = await userModel.findOne({ email });

    // If they don't exist, return false and say the user doesn't exist
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    // If they do exist then compare the password with the encrypted one
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    // Include auth middleware
    const userId = req.body.userId;

    // Validate required fields
    if (!email || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Email and userId is required" });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Security: Ensure only the user can delete their own account
    // If user is logged in and the user they're trying to delete is NOT themselves
    // user._id is ObjectId type and must be converted to string before comparing
    if (userId && user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "User may only delete their own account",
      });
    }

    // Start cascade deletion (delete user document and collections owned by user)
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete user's collections first
        await collectionModel.deleteMany({ userId: user._id }, { session });

        // Delete the user
        await userModel.findByIdAndDelete(user._id, { session });
      });

      await session.endSession();

      res.json({
        success: true,
        message: "Account has been permanently deleted",
      });
    } catch (transactionError) {
      await session.endSession();
      console.log(transactionError);
      return res.status(400).json({
        success: false,
        message: "Account could not be deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, deleteUser };
