// middleware/auth.js
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    
    const admin = await Admin.findById(decoded.id).select("-password");
    
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};