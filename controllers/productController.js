import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

// ============================
// BRAINTREE GATEWAY (FIXED)
// ============================
const gateway = new braintree.BraintreeGateway({
  environment:
    process.env.NODE_ENV === "production"
      ? braintree.Environment.Production
      : braintree.Environment.Sandbox,

  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// ============================
// CREATE PRODUCT
// ============================
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !category || !quantity)
      return res.status(400).send({ error: "All fields are required" });

    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

// ============================
// GET ALL PRODUCTS
// ============================
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// ============================
// GET SINGLE PRODUCT
// ============================
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// ============================
// PRODUCT PHOTO
// ============================
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product?.photo?.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// ============================
// DELETE PRODUCT
// ============================
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// ============================
// UPDATE PRODUCT
// ============================
export const updateProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(req.fields.name) },
      { new: true }
    );

    if (req.files.photo) {
      product.photo.data = fs.readFileSync(req.files.photo.path);
      product.photo.contentType = req.files.photo.type;
    }

    await product.save();
    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// ============================
// FILTER PRODUCTS
// ============================
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked?.length) args.category = checked;
    if (radio?.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
};

// ============================
// PRODUCT COUNT
// ============================
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.estimatedDocumentCount();
    res.status(200).send({ success: true, total });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
};

// ============================
// PRODUCT LIST (Pagination)
// ============================
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page || 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
};

// ============================
// BRAINTREE TOKEN (FIXED)
// ============================
export const braintreeTokenController = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      console.log("BRAINTREE TOKEN ERROR:", err);
      return res.status(500).send(err);
    }
    res.status(200).send(response);
  });
};

// ============================
// BRAINTREE PAYMENT (FIXED)
// ============================
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    gateway.transaction.sale(
      {
        amount: total.toFixed(2),
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      async (error, result) => {
        if (result.success) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          });
          await order.save();
          res.json({ ok: true });
        } else {
          console.log("BRAINTREE PAYMENT ERROR:", result);
          res.status(500).send(result.message);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Payment Failed");
  }
};
