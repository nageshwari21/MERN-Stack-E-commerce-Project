import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode; // {_id, role}
    next();
  } catch {
    return res.status(401).json({ ok: false });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user || user.role !== 1) {
    return res.status(403).json({ ok: false });
  }
  next();
};
