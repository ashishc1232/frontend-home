import express from "express";
import { createOrder, getUserOrders, getSellerOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../controllers/authController.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/user", authMiddleware, getUserOrders);
router.get("/seller", authMiddleware, getSellerOrders);

export default router;
