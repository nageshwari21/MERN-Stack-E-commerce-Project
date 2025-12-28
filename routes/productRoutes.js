import express from "express";
import formidable from "express-formidable";

import {
  createProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  deleteProductController,
  productFilterController,
  productListController,
  productCountController,
  searchProductController,
  productCategoryController, // ⭐ IMPORTANT
} from "../controllers/productController.js";

const router = express.Router();

// CREATE PRODUCT
router.post("/create-product", formidable(), createProductController);

// GET ALL PRODUCTS (ADMIN)
router.get("/get-product", getAllProductController);

// GET SINGLE PRODUCT
router.get("/single-product/:id", getSingleProductController);

// PRODUCT PHOTO
router.get("/product-photo/:pid", productPhotoController);

// UPDATE PRODUCT
router.put("/update-product/:id", formidable(), updateProductController);

// DELETE PRODUCT
router.delete("/delete-product/:id", deleteProductController);

// HOME PAGE
router.get("/product-list/:page", productListController);
router.post("/product-filters", productFilterController);
router.get("/product-count", productCountController);

// SEARCH
router.get("/search/:keyword", searchProductController);

// ⭐ CATEGORY → PRODUCTS (THIS WAS MISSING)
router.get(
  "/product-category/:slug",
  productCategoryController
);

export default router;
