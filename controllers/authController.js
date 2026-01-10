import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

/* =========================
   REGISTER
========================= */
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: true, message: "Already registered" });
    }

    const hashed = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashed,
    }).save();

    res.status(201).send({ success: true, message: "Registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   LOGIN
========================= */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send({ success: false, message: "Wrong password" });

    const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

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
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({ success: true, message: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address, password } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password) user.password = await hashPassword(password);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   USER - MY ORDERS
========================= */
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   ADMIN - ALL ORDERS
========================= */
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

/* =========================
   ADMIN - UPDATE STATUS
========================= */
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).send({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};
