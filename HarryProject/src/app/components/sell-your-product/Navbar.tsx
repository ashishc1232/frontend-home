"use client";

import { useSellerAuth } from "@/context/authContextSeller";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { seller, logoutSeller } = useSellerAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logoutSeller();
    setTimeout(() => {
      router.replace("/");
    }, 100);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <img className="h-12 w-auto" src="/homepage/Sweethome1.png" alt="Logo" />
          </div>

          <div className="flex items-center space-x-8 relative">
            {seller ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 font-medium focus:outline-none"
                >
                  <span>{seller.name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <Link href="/seller/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/seller/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Dashboard
                    </Link>
                    <Link href="/seller/product" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Product
                    </Link>
                    {/* <Link href="/seller/order" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Order Tracking
                    </Link> */}
                     <Link href="/seller/payment" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Payment
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
          </div>
        </div>
      </div>
    </nav>
  );
}
