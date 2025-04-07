// controllers/sellerController.js
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const registerSeller = async (req, res) =>  {
    try {
        const { name, mobile, email, password } = req.body;

        // Check if seller already exists
        let existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

       

        // Create new seller with sellerId
        const newSeller = new Seller({
            sellerId: undefined, // Auto-generated from schema
            name,
            mobile,
            email,
            password
        });

        // Save to database
        await newSeller.save();
        res.status(201).json({ message: 'Seller registered successfully', seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: 'Error registering seller', error });
    }
};

// Seller Login
// export const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });
//     if (!seller) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//     res.json({ message: "Login successful", seller: { name: seller.name, email: seller.email } });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("seller_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Login successful", seller: { name: seller.name, email: seller.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.seller_token;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findById(decoded.id);
    if (!seller) return res.status(401).json({ message: "Not authenticated" });

    res.status(200).json({ 
      message: "Authenticated",
      seller: { name: seller.name, email: seller.email } // ✅ Return seller details
    });
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export const logoutSeller = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logout successful" });
};

export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller.id).select("-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
