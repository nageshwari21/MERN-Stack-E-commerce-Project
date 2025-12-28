import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

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

    // 🔥 FIX: check by slug, not name
    const slug = slugify(name, { lower: true });

    const existingCategory = await categoryModel.findOne({ slug });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug,
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category",
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
    const { id } = req.params;

    const slug = slugify(name, { lower: true });

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

/* =========================
   GET ALL CATEGORIES
========================= */
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All categories",
      categories, // ✅ IMPORTANT
    });
  } catch (error) {
    console.log(error);
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
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
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
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

/* =========================
   DELETE CATEGORY
========================= */
export const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
