/** @format */

import userModel from "../models/User.model.js";
import auth from "../common/auth.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const hashedPassword = await auth.hashPassword(password);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await auth.hashCompare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await auth.createToken({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    let userData = await userModel.findOne(
      { email: req.body.email },
      { password: 0, status: 0, createdAt: 0 }
    );
    res.status(200).json({ message: "Signin successful", token, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const generateOTP = () => {
      const characters = "0123456789";
      return Array.from(
        { length: 6 },
        () => characters[Math.floor(Math.random() * characters.length)]
      ).join("");
    };

    const OTP = generateOTP();
    user.resetPasswordOtp = OTP;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASS_MAILER,
      },
    });

    const mailOptions = {
      from: "eyegamers1234@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>Dear ${user.firstName} ${user.lastName},</p>
        <p>We received a request to reset your password. Here is your One-Time Password (OTP): <strong>${OTP}</strong></p>
        <p>Please click the following link to reset your password:</p>
        <a href="https://password-reset-flows.netlify.app/reset-password">Reset Password</a>
        <p>If you did not make this request, please ignore this email.</p>
        <p>Thank you,</p>
        <p>From Validation</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { OTP, password } = req.body;

    const user = await userModel.findOne({
      resetPasswordOtp: OTP,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const message = user ? "OTP has expired" : "Invalid OTP";
      return res.status(404).json({ message });
    }

    const hashedPassword = await auth.hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "User id is missing" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id, firstName, lastName, email, role, bookings } = user;

    res
      .status(200)
      .json({ user: { _id, firstName, lastName, email, role, bookings } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = updatedUserData.firstName;
    user.lastName = updatedUserData.lastName;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // Validate if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    Object.assign(existingUser, updatedUserData);
    
    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await userModel.deleteOne({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default {
  signupController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  getAllUsersController,
  getUserByIdController,
  updateUserProfile,
  editUserController,
  deleteUserController,
};
