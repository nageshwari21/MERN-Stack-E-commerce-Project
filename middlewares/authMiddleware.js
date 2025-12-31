import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ ok: false, message: "Token missing" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT ERROR 👉", error.message);
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).json({ ok: false });
    }
    next();
  } catch (error) {
    console.log("ADMIN ERROR 👉", error.message);
    res.status(500).json({ ok: false });
  }
};
