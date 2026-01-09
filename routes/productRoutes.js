import express from "express";
import formidable from "express-formidable";

import {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  productFiltersController,
  productCountController,
  productListController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================
// PRODUCT ROUTES
// ============================

// CREATE
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// UPDATE
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// GET ALL PRODUCTS
router.get("/get-product", getProductController);

// GET SINGLE PRODUCT
router.get("/single-product/:pid", getSingleProductController);

// PRODUCT PHOTO
router.get("/product-photo/:pid", productPhotoController);

// FILTER
router.post("/product-filters", productFiltersController);

// COUNT
router.get("/product-count", productCountController);

// PAGINATION
router.get("/product-list/:page", productListController);

// ============================
// BRAINTREE PAYMENT ROUTES
// ============================

// GET CLIENT TOKEN
router.get("/braintree/token", braintreeTokenController);

// MAKE PAYMENT
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
