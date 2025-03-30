import express from "express"
import { registerUser, loginUser, logoutUser,authMiddleware } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
export default router
