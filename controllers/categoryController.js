import slugify from "slugify";
import Category from "../models/categoryModel.js";

/* =========================
   CREATE CATEGORY
========================= */
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating category",
      error,
    });
  }
};

/* =========================
   GET ALL CATEGORIES
========================= */
export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All categories list",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error,
    });
  }
};

/* =========================
   GET SINGLE CATEGORY
========================= */
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single category fetched",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

/* =========================
   UPDATE CATEGORY
========================= */
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

/* =========================
   DELETE CATEGORY
========================= */
export const deleteCategoryController = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
