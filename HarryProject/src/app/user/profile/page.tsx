"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";

// Define TypeScript interface for user data
interface User {
  name: string;
  email: string;
  mobile: string;
  address?: string;
  shopName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          credentials: "include", // To send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) throw new Error("Failed to fetch user profile");
  
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-10 px-6">
      {/* Back Button */}
      <button
        className="mb-4 px-4 py-2 bg-orange-200 text-orange-700 rounded-lg shadow hover:bg-orange-200 transition-all"
        onClick={() => router.push("/categories")}
      >
        ← Back to Categories
      </button>


      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-yellow-800 text-center mb-6">User Profile</h2>

        {/* Personal Information */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Personal Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>
          <p><strong>Shop Name:</strong> {user.shopName || "N/A"}</p>

          <motion.button
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>
        </div>

        {/* Bank Account Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Bank Account Details</h3>
          <p><strong>Account Number:</strong> {user.accountNumber || "N/A"}</p>
          <p><strong>IFSC Code:</strong> {user.ifscCode || "N/A"}</p>

          <motion.button
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Bank Details
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
