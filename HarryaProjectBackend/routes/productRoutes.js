import express from "express";
import { addProduct, getMyProducts, getProductById, getProducts,  } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Use Multer for file uploads
router.post("/add",protect, upload.array("images", 5), addProduct);

router.get("/", getProducts);
router.get("/mine", protect, getMyProducts);
router.get("/:productId", getProductById);


export default router;
