"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context"; 
import { useRouter } from "next/navigation";


export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth(); // Get logout function from auth context

  const handleLogout = async () => {
    try {
      await logout(); // Use context logout function
      router.push("/log-in"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Sweet-Home
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/shop" className="text-gray-600 hover:text-gray-800">
            Shop
          </Link>
          <Link href="/aboutt" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </div>


        {/* Icons */}
        <div className="flex items-center space-x-4">
        
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            >
              Logout
            </motion.button>
          <Link href="/wishlist" className="text-gray-600 hover:text-gray-800">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-800">
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

