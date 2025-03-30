//controllers/productController.js
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    console.log("Received request:", req.method, req.path);
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      name, description, price, discountPrice, stock, unit, deliveryTime,
      category, subcategory, returnPolicy, paymentMode, sellerName,
      contact, location
    } = req.body;

    if (!name || !description || !price || !stock || !category || !subcategory || !contact || !location) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Ensure images are correctly saved
    const images = req.files.map(file => "/" + file.path.replace(/\\/g, "/"));

    // Get seller id from authenticated request (ensure middleware sets req.seller)
    const sellerId = req.seller ? req.seller._id : null;
    if (!sellerId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const newProduct = new Product({
      sellerId, // save seller id along with product data
      name, description, price, discountPrice, stock, unit, deliveryTime,
      category, subcategory, returnPolicy, paymentMode, sellerName,
      contact, location, images
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    // req.seller is set by the protect middleware
    const sellerId = req.seller._id;
    const products = await Product.find({ sellerId });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller products", error });
  }
};
  
  // productController.js
  export const getProducts = async (req, res) => {
    try {
      let { category, subcategory } = req.query;
      
  
      const query = {};
      if (category) query.category = new RegExp(`^${category}$`, "i");  
  
      if (subcategory) {
        // Convert hyphens to spaces for better matching
        const normalizedSubcategory = subcategory.replace(/-/g, " ");
        query.subcategory = new RegExp(`^${normalizedSubcategory}$`, "i");
      }
  
      
  
      const products = await Product.find(query);
      
  
      res.json({ products });
    } catch (error) {
     
      res.status(500).json({ message: "Error fetching products" });
    }
  };
  
  
  export const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error) {
      
      res.status(500).json({ message: "Error fetching product" });
    }
  };
  


export const getProductsBySeller = async (req, res) => {
    try {
        const { sellerId } = req.params;
        if (!sellerId) {
            return res.status(400).json({ message: "Seller ID is required" });
        }

        const products = await Product.find({ sellerId: sellerId });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this seller" });
        }

        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller products", error });
    }
};
