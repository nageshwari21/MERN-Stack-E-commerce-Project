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
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


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
  formidable(), // 🔥 REQUIRED
  updateProductController
);

// DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// GET ALL
router.get("/get-product", getProductController);


router.get("/single-product/:pid", getSingleProductController);

// PHOTO
router.get("/product-photo/:pid", productPhotoController);

router.post("/product-filters", productFiltersController);

// COUNT
router.get("/product-count", productCountController);

// PAGINATION
router.get("/product-list/:page", productListController);

export default router;
