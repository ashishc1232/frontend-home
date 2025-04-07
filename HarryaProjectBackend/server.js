import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import sellerRoutes from "./routes/sellerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/admin.js"

dotenv.config()
connectDB()

const app = express()

// Security & Middleware
app.use(cors({ origin: ["http://localhost:3000","https://sweethome-psi.vercel.app/"], credentials: true, methods: ["GET", "POST", "PUT", "DELETE"], }))
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: process.env.NODE_ENV === "production" ? 100 : 1000, message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false, })
app.use(limiter)


app.use("/api/auth", authRoutes)
app.use("/api/seller", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));


// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
