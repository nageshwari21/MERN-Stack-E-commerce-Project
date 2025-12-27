import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// TEST (ADMIN ONLY)
router.get("/test", requireSignIn, isAdmin, testController);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

// USER AUTH CHECK
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// ADMIN AUTH CHECK
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
