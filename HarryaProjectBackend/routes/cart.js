import express from "express";
import Cart from "../models/Cart";
const router = express.Router();

// Add to Cart API
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.productId === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: "Product added to cart!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Cart API
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    res.json(cart ? cart.products : []);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
