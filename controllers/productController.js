import fs from "fs";
import slugify from "slugify";
import Product from "../models/productModel.js";

/* =========================
   CREATE PRODUCT
========================= */
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({
        success: false,
        message: "Photo should be less than 1MB",
      });
    }

    const product = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
    });

    // save photo
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
export const getAllProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */
export const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

/* =========================
   GET PRODUCT PHOTO
========================= */
export const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product?.photo?.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

    res.status(404).send({
      success: false,
      message: "Photo not found",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        shipping,
      },
      { new: true }
    );

    if (photo) {
      if (photo.size > 1000000) {
        return res.status(400).send({
          success: false,
          message: "Photo should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
