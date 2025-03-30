"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Bookmark, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import RegistrationForm from "../RegistrationForm";  // For sellers
import LoginForm from "../LoginForm";  // For sellers


export default function Navbar() {
  const [sellModal, setSellModal] = useState<"register" | "login" | null>(null);
  const [userModal, setUserModal] = useState<"register" | "login" | null>(null);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={"/"}><img className="h-12 w-auto" src="/homePage/Sweethome1.png" alt="Logo" /></Link>
          </div>

          {/* Categories and Search */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for more than 20,000 products"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="font-medium">HOME</Link>
              <Link href="/about" className="font-medium">ABOUT</Link>
              <Link href="/sign-up" className="font-medium">
                SIGN UP
              </Link>
              <Link href="/log-in" className="font-medium">
                LOG IN
              </Link>
            </div>

            {/* Sell Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
              onClick={() => setSellModal("register")}  // Sell-specific registration
            >
              Sell
            </motion.button>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-gray-700" />
              <Bookmark className="w-6 h-6 text-gray-700" />
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* SELLER Modals */}
      {sellModal === "register" && (
        <RegistrationForm 
          onClose={() => setSellModal(null)} 
          onSwitch={() => setSellModal("login")} 
        />
      )}
      {sellModal === "login" && (
        <LoginForm 
          onClose={() => setSellModal(null)} 
          onSwitch={() => setSellModal("register")} 
        />
      )}

    
    </nav>
  );
}
