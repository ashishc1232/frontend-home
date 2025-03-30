"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Navbar from "./Navbar"
import { categories } from "./categories"

export default function SellYourProduct() {
  const router = useRouter()

  const handleCategoryClick = (id: string) => {
    router.push(`/categories/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white">
       <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
        <motion.h1
          className="text-4xl font-bold text-center text-yellow-800 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sell Your Product
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={category.image || "/1.jpg"}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-yellow-800">{category.name}</h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
