"use client"

import { useEffect, useState } from "react"
import CategorySection from "./category-section"
import Navbar from "./Navbar"
import BestSellingProducts from "./Best-Selling-Products"
import Promotions from "./Promotions"
import Features from "./Features"
// import slide1 from "../../../../public/homePage/slide1.jpg"
// import slide2 from "../../../../public/homePage/slide2.png"
// import slide3 from "../../../../public/homePage/slide3.jpg"
// import slide4 from "../../../../public/homePage/slide4.jpg"

const slides = [
  {
    title: (
      <>
        {/* <span className="text-green-500">Organic</span> Foods
        <br />
        at your
        <br />
        Doorsteps */}
      </>
    ),
    subtitle: "",
    image: "/homePage/slide4.jpg",
   
  },
  {
    title: (
      <>
        {/* <span className="text-green-500">Fresh</span> Veggies
        <br />
        Daily
        <br />
        Delivery */}
      </>
    ),
    subtitle: "",
    image: "/homePage/slide2.png",
    bgColor: "bg-[#E8F5E9]",
  },
  {
    title: (
      <>
        {/* <span className="text-green-500">Healthy</span> Food
        <br />
        Healthy
        <br />
        Lifestyle */}
      </>
    ),
    subtitle: "",
    image: "/homePage/candle-slide.jpg",
    bgColor: "bg-[#FFF3E0]",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Carousel */}
      <div className="relative overflow-hidden">
        <div className="relative w-full" style={{ height: "600px" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" , zIndex:99, }}
            >
              <div className="max-w-7xl mx-auto px-6 py-20 h-full">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">{slide.title}</h1>
                  <p className="mt-6 text-xl text-gray-200">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-green-500" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Section */}
      <CategorySection />

      {/* Best Selling Products */}
      <BestSellingProducts />

      {/* Promotions Section */}
      <Promotions />

      {/* Features Section */}
      <Features />
    </div>
  )
}

