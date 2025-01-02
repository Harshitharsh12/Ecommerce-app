import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//Router Object:
const router = express.Router();
//Routing:
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN ||POST
router.post("/login", loginController);

// Test Route
router.post("/test", testController);

export default router;
