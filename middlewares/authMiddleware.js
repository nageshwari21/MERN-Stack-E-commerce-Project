import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ success: false, message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode; // { _id, role }
    next();
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(403).send({ success: false, message: "Admin only" });
    }

    next();
  } catch (error) {
    return res.status(403).send({ success: false, message: "Admin only" });
  }
};
