import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ================= PROTECTED ROUTE =================
export const requireSignIn = async (req, res, next) => {
  try {
    // 1. Check header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // 2. Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing",
      });
    }

    // 3. Verify token
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info
    req.user = decode;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ================= ADMIN ACCESS =================
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Admin access denied",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
