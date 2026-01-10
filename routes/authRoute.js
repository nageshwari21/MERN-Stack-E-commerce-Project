import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth", requireSignIn, (req, res) => res.send({ ok: true }));
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => res.send({ ok: true }));

router.put("/profile", requireSignIn, updateProfileController);

// USER
router.get("/orders", requireSignIn, getOrdersController);

// ADMIN
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put("/order-status/:orderId", requireSignIn, isAdmin, updateOrderStatusController);

export default router;
