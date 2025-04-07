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

    // Set both sellerId and seller fields (if you want to keep both)
    const newProduct = new Product({
      sellerId,      // For Seller model reference
      seller: sellerId,  // For User model reference (or you can remove this field if not needed)
      name,
      description,
      price,
      discountPrice,
      stock,
      unit,
      deliveryTime,
      category,
      subcategory,
      returnPolicy,
      paymentMode,
      sellerName,
      contact,
      location,
      images
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

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.seller._id; // Get seller ID from authentication middleware

    // Find and delete the product only if it belongs to the authenticated seller
    const product = await Product.findOneAndDelete({ _id: productId, sellerId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.seller._id; // Get seller ID from authentication middleware

    let product = await Product.findOne({ _id: productId, sellerId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    // Extract updated fields from request body
    const {
      name, description, price, discountPrice, stock, unit, deliveryTime,
      category, subcategory, returnPolicy, paymentMode, contact, location
    } = req.body;

    // Update product fields if they are provided
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.stock = stock || product.stock;
    product.unit = unit || product.unit;
    product.deliveryTime = deliveryTime || product.deliveryTime;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.returnPolicy = returnPolicy || product.returnPolicy;
    product.paymentMode = paymentMode || product.paymentMode;
    product.contact = contact || product.contact;
    product.location = location || product.location;

    // If new images are uploaded, update the image paths
    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => "/" + file.path.replace(/\\/g, "/"));
    }

    await product.save();
    res.json({ message: "Product updated successfully!", product });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
