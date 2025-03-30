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
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/seller", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));


// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
