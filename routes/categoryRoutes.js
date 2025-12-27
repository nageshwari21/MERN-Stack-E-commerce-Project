import express from "express";
import {
  createCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* CREATE CATEGORY */
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/* GET ALL CATEGORIES */
router.get("/get-category", getAllCategoryController);

/* GET SINGLE CATEGORY */
router.get("/single-category/:slug", getSingleCategoryController);

/* UPDATE CATEGORY */
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/* DELETE CATEGORY */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
