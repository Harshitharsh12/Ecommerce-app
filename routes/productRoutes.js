import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
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
router.get("/get-product", getProductController);
router.get("/get-singleProduct/:slug", getSingleProductController);
router.get("/get-productPhoto/:pid", getProductPhotoController);
export default router;
