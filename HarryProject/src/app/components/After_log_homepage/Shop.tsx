//Shop.tsx
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { categories, subcategories } from "../sell-your-product/categories"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    title: "10% OFF YOUR FIRST ORDER",
    subtitle: "Reasonable Price",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
    title: "NEW SUMMER COLLECTION",
    subtitle: "Fashion Forward",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070",
    title: "EXCLUSIVE DEALS",
    subtitle: "Limited Time Offer",
  },
]

const pages = ["Shopping Cart", "Checkout", "My Account", "Track Order"]

export default function Shop() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
 
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]))
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Main Content */}
      <main>
        {/* Categories Sidebar + Hero Section */}
        <div className="container mx-auto px-4 flex">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 pr-6">
            <ul className="border rounded-lg overflow-hidden">
              {categories.map((category) => (
                <li key={category.id} className="relative">
                  <div className="flex flex-col">
                    <div
                      className="flex justify-between items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors border-b last:border-b-0 cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="flex-1">{category.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedCategories.includes(category.id) ? "rotate-180" : "",
                        )}
                      />
                    </div>

                    <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 bg-gray-50",
                          expandedCategories.includes(category.id) ? "max-h-[500px]" : "max-h-0",
                        )}
                      >

                      {subcategories[category.id]?.map((sub) => (
                        <Link
                          key={sub}
                          href={`/shop/${encodeURIComponent(category.id.toLowerCase())}/${encodeURIComponent(sub.toLowerCase().replace(/\s+/g, "-"))}`}
                          className="block px-6 py-2 hover:bg-primary hover:text-white transition-colors text-sm border-t border-gray-100 first:border-t-0"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Section */}
          <div className="flex-1 relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40">
                    <div className="h-full flex flex-col items-center justify-center text-white text-center">
                      <h2 className="text-2xl mb-4">{slide.title}</h2>
                      <h1 className="text-6xl font-bold mb-8">{slide.subtitle}</h1>
                      <Button size="lg" variant="secondary">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Slider Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
