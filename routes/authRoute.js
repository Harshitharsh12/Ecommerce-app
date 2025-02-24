import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//Router Object:
const router = express.Router();
//Routing:
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN ||POST
router.post("/login", loginController);

//Forget Password:
router.post("/forgot-password", forgotPasswordController);

// Test Route
router.post("/test", requireSignIn, isAdmin, testController);
router.post("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
