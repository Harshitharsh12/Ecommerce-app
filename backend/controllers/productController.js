import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
// payment gateway:
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !photo ||
      !shipping
    ) {
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
      shipping,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully!!",
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
  try {
    const { slug } = req.params;
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
  try {
    const { pid } = req.params;
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
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted Successfully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting Product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    const { pid } = req.params;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !photo ||
      !pid ||
      !shipping
    ) {
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

    const product = await productModel.findByIdAndUpdate(
      pid,
      // { ...req.fields, slug: slugify(name) },
      // or
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
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Product",
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Filtering Products!!",
      error,
    });
  }
};
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Product Count!!",
      error,
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl!!",
      error,
    });
  }
};
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product API!!",
      error,
    });
  }
};
export const relatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Product!!",
      error,
    });
  }
};
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting products!!",
      error,
    });
  }
};

// payment gateway api
// token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payment

export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
