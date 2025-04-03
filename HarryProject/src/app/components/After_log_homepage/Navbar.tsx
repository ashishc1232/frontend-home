"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
   const { user, logout } = useAuth();
  // const { logout } = useAuth(); // Get logout function from auth context
 const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const handleLogout = async () => {
  //   try {
  //     await logout(); // Use context logout function
  //     router.push("/log-in"); // Redirect to login page
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };
  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      router.push("/log-in");
    }, 100);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
            <img className="h-12 w-auto" src="/homepage/Sweethome1.png" alt="Logo" />
          </div>

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
        
        
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 font-medium focus:outline-none"
                >
                  <span>{user.name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg  z-50">
                  
                    <Link  href="" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                  
                   
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                  
                )}
              </div>
            ) : (
              <button
                onClick={() => router.replace("/Sell-log-in")}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            )}
          
           
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

