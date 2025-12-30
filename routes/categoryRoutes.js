import express from "express";
import {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
  categoryProductController,
} from "../controllers/categoryController.js";

const router = express.Router();

// CREATE CATEGORY
router.post("/create-category", createCategoryController);

// GET ALL CATEGORIES
router.get("/get-category", getAllCategoryController);

// 🔥 CATEGORY PAGE ROUTE (VERY IMPORTANT)
router.get("/category-product/:slug", categoryProductController);

// UPDATE CATEGORY
router.put("/update-category/:id", updateCategoryController);

// DELETE CATEGORY
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
