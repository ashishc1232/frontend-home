// routes/admin.js
import express from "express";
import Admin from "../models/admin.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ admin: { id: admin._id, name: admin.name, email: admin.email }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get("/users", adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sellers
router.get("/sellers", adminAuthMiddleware, async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products with seller details
router.get("/products", adminAuthMiddleware, async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders with user and product details
router.get("/orders", adminAuthMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("seller", "name email")
      .populate({
        path: "items.product",
        select: "name price images",
      });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete User
router.delete("/users/:id", adminAuthMiddleware, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Seller
  router.delete("/sellers/:id", adminAuthMiddleware, async (req, res) => {
    try {
      await Seller.findByIdAndDelete(req.params.id);
      res.json({ message: "Seller deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Product
  router.delete("/products/:id", adminAuthMiddleware, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Order
  router.delete("/orders/:id", adminAuthMiddleware, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Dashboard summary
router.get("/dashboard", adminAuthMiddleware, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    
    // Get revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + order.finalAmount, 0);
    
    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name")
      .populate({
        path: "items.product",
        select: "name price images",
      });

    res.json({
      counts: {
        users: userCount,
        sellers: sellerCount,
        products: productCount,
        orders: orderCount,
      },
      revenue: totalRevenue,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;