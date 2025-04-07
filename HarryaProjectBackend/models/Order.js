//models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    items: [OrderItemSchema],
    paymentMethod: { type: String, required: true },
    address: { type: String, required: true },
    deliveryEstimation: { type: String, required: true },
    trackingInfo: { type: String },
    finalAmount: {
        type: Number,
        required: true,
    }
    ,
    status: { type: String, default: "Successful" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
