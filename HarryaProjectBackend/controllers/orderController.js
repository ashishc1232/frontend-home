import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const createOrder = async (req, res) => {
    const { items, paymentMethod, address } = req.body;
    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in order" });
      }
  
      const orderItems = [];
      let seller = null;
      let finalAmount = 0; // 💰 total amount for the order
  
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
  
        if (!product.sellerId) {
          return res.status(400).json({ message: "Seller information not available for one or more products" });
        }
  
        const price = product.discountPrice || product.price;
        const lineTotal = price * item.quantity;
  
        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: price,
        });
  
        finalAmount += lineTotal; // 💸 Add to final total
  
        if (!seller) {
          seller = product.sellerId;
        }
      }
  
      if (!seller) {
        return res.status(400).json({ message: "Seller information not available" });
      }
  
      const deliveryEstimation = "3-5 business days";
      const trackingInfo = "TRACK123456";
  
      const order = await Order.create({
        user: req.user._id,
        seller,
        items: orderItems,
        paymentMethod,
        address,
        deliveryEstimation,
        trackingInfo,
        finalAmount, // ✅ Save this
      });
  
      return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Get orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .populate("seller", "name email")
      .populate("user", "name"); // Populate seller details if needed
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get orders for a seller (to see which of his products were bought)


export const getSellerOrders = async (req, res) => {
    try {
      // Use req.seller from the seller auth middleware
      const sellerId = req.seller && req.seller._id;
      if (!sellerId) {
        return res.status(401).json({ message: "Not authenticated as seller" });
      }
  
      const orders = await Order.find({ seller: sellerId })
        .populate("items.product")
        .populate("seller", "name email")
        .populate("user", "name");
      return res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  