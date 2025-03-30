import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Register User
export const registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already in use" })

    const newUser = await User.create({ name, email, mobile, password })
    res.status(201).json({ message: "User registered successfully", token: generateToken(newUser._id) })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// authController.js
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Set HTTP-only cookie
    res.cookie('token', generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add this middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Add logout endpoint
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logout successful" });
};