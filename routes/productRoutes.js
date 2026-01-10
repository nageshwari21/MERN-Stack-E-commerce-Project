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
  getProductByCategoryController,
  searchProductController,
} from "../controllers/productController.js";

const router = express.Router();

/* ================= ADMIN ================= */
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

/* ================= PUBLIC ================= */
router.get("/get-product", getProductController);
router.get("/single-product/:slug", getSingleProductController);   // 🔥 FIX
router.get("/product-photo/:pid", productPhotoController);
router.get("/product-category/:slug", getProductByCategoryController);
router.get("/search/:keyword", searchProductController);

router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);

/* ================= PAYMENT ================= */
router.get("/braintree/token", requireSignIn, braintreeTokenController);
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
