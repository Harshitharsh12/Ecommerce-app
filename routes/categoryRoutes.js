import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteAllCategoryController,
  deleteSingleCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

// routes:
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/get-category", categoryController);

// single category:
router.get("/single-category/:slug", singleCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteSingleCategoryController
);
router.delete(
  "/delete-allcategory",
  requireSignIn,
  isAdmin,
  deleteAllCategoryController
);

export default router;
