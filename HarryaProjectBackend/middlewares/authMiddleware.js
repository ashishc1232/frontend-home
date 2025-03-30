import jwt from "jsonwebtoken"
import Seller from "../models/Seller.js";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = await Seller.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
