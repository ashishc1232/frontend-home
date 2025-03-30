import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Seller", 
    required: true 
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  unit: { type: String },
  deliveryTime: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  returnPolicy: { type: String },
  paymentMode: { type: String },
  sellerName: { type: String },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  images: [{ type: String }], // Image URLs
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
