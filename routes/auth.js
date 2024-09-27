import express from "express";
import {
  login,
  createAccount,
  changePassword,
  forgetPassword,
  resetPassword,
  getResetPassword,
  updateAccount,
  checkAuth,
} from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  loginLmiter,
  loginSpeedLimiter,
  resetPasswordLimiter,
  resetPasswordSpeedLimiter,
} from "../utils/rateLimiters.js";

const router = express.Router();

router.post("/login", loginLmiter, loginSpeedLimiter, login);
router.put("/change-password", authMiddleware, changePassword);
router.post("/forget-password", forgetPassword);
router.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  resetPasswordSpeedLimiter,
  resetPassword
);
router.put("/update-account", authMiddleware, updateAccount);
router.get("/reset-password/:token/:userId", getResetPassword);
router.get("/check-auth", authMiddleware, checkAuth);
router.post("/signup", createAccount);

export { router as authRoute };
