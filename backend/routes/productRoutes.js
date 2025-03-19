import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  relatedProductsController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-products", getProductController);
router.get("/get-singleProduct/:slug", getSingleProductController);
router.get("/get-photo/:pid", getProductPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-products/:pid/:cid", relatedProductsController);
router.get("/product-category/:slug", productCategoryController);

//payment routes
//toker
router.get("/braintree/token", braintreeTokenController);

// payments:
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
