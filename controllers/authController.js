import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

/* =========================
   REGISTER CONTROLLER
========================= */
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};

/* =========================
   LOGIN CONTROLLER ✅ FIXED
========================= */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // 🔥 IMPORTANT: INCLUDE ROLE IN JWT
    const token = JWT.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("LOGIN ERROR 👉", error);
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR 👉", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

/* =========================
   TEST CONTROLLER (ADMIN)
========================= */
export const testController = (req, res) => {
  res.send("Admin protected test route working ✅");
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "User not found",
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    if (password) {
      if (password.length < 6) {
        return res.status(400).send({
          success: false,
          error: "Password must be at least 6 characters",
        });
      }
      user.password = await hashPassword(password);
    }

    await user.save();

    res.status(200).send({
      success: true,
      updatedUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("PROFILE UPDATE ERROR 👉", error);
    res.status(500).send({
      success: false,
      error: "Profile update failed",
    });
  }
};
