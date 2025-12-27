import express from "express";
import formidable from "express-formidable";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

import {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  productPhotoController,
} from "../controllers/productController.js";

const router = express.Router();

/* =========================
   CREATE PRODUCT (ADMIN)
========================= */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

/* =========================
   GET ALL PRODUCTS
========================= */
router.get("/get-product", getAllProductController);

/* =========================
   GET SINGLE PRODUCT
========================= */
router.get("/single-product/:slug", getSingleProductController);

/* =========================
   GET PRODUCT PHOTO
========================= */
router.get("/product-photo/:pid", productPhotoController);

/* =========================
   UPDATE PRODUCT (ADMIN)
========================= */
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

/* =========================
   DELETE PRODUCT (ADMIN)
========================= */
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
