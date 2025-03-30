// models/Seller.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid'; // Use import instead of require
const sellerSchema = new mongoose.Schema(
  {
    sellerId: { type: String, unique: true, default: uuidv4 }, // Auto-generate sellerId
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;