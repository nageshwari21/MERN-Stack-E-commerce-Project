import express from "express";
import formidable from "express-formidable";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

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

const router = express.Router();

/* =========================
   ADMIN PRODUCT ROUTES
========================= */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

/* =========================
   PUBLIC PRODUCT ROUTES
========================= */
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);

router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);

/* =========================
   PAYMENT ROUTES (SECURE)
========================= */
router.get("/braintree/token", requireSignIn, braintreeTokenController);
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
