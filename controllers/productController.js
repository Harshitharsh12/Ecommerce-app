import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    if (!name || !description || !price || !category || !quantity || !photo) {
      return res
        .status(500)
        .send({ success: false, message: "Each field is required!!" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        success: false,
        message: "photo is required and should be less than 1mb!!",
      });
    }
    const products = new productModel({
      // ...req.fields,
      // slug: slugify(name),

      // or
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Products Created Successfully!!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product",
    });
  }
};
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalproducts: products.length,
      message: "All Products:",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Products",
    });
  }
};
export const getSingleProductController = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product:",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Product",
      error,
    });
  }
};
export const getProductPhotoController = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Product photo",
      error,
    });
  }
};
