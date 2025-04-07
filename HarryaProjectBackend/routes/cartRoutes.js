import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartControllers.js";
import { authMiddleware } from "../controllers/authController.js";

const router = express.Router();

// All routes below require the user to be logged in
router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.post("/update", authMiddleware, updateCartItem);
router.delete("/remove", authMiddleware, removeCartItem);

export default router;
