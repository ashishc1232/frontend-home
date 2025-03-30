
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import Navbar from "../Homepage/Navbar"



export default function About() {
  const [count, setCount] = useState({ years: 0, products: 0, customers: 0 })
  const [expanded, setExpanded] = useState<number | null>(null); // Track which policy is expanded


  const policies = [
    {
      title: "Quality Assurance",
      content: "We ensure all our products meet the highest organic standards.",
      details: "Our quality control team monitors every step from sourcing to packaging to ensure the best quality."
    },
    {
      title: "Sustainability Pledge",
      content: "Our commitment to eco-friendly practices in every step of production.",
      details: "We use biodegradable packaging and support sustainable farming practices across all our products."
    },
    {
      title: "Fair Trade",
      content: "Supporting farmers with fair prices and ethical working conditions.",
      details: "We partner with fair-trade certified organizations to ensure farmers receive fair compensation."
    },
    {
      title: "Customer Satisfaction",
      content: "100% satisfaction guarantee on all our organic products.",
      details: "We offer hassle-free returns and provide 24/7 customer support for all our products."
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => ({
        years: prevCount.years < 10 ? prevCount.years + 1 : 10,
        products: prevCount.products < 500 ? prevCount.products + 25 : 500,
        customers: prevCount.customers < 10000 ? prevCount.customers + 500 : 10000,
      }))
    }, 100)

    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white">
       <Navbar />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/1.jpg?height=1080&width=1920"
          alt="Organic farm"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Organic</h1>
          <p className="text-xl">Nurturing Nature, Nourishing Lives</p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To create a world where sustainable, organic farming practices are the norm, ensuring a healthier planet
                and population for generations to come.
              </p>
              <ul className="space-y-2">
                {["Sustainability", "Health", "Community"].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="mr-2 text-fresh-yellow-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To provide high-quality, organic products while promoting sustainable farming practices and supporting
                local communities.
              </p>
              <div className="bg-fresh-yellow-100 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-semibold text-gray-800 mb-2">Our Commitment</h3>
                <p className="text-gray-700">
                  We are dedicated to delivering organic excellence, fostering environmental stewardship, and empowering
                  farmers and consumers alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="bg-fresh-yellow-50 py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Years of Experience", value: count.years },
              { label: "Organic Products", value: count.products },
              { label: "Happy Customers", value: count.customers.toLocaleString() },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-4xl font-bold text-fresh-yellow-500 mb-2">{item.value}+</h3>
                <p className="text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Organic Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: "/1.jpg?height=300&width=400", alt: "Organic farm" },
              { src: "/1.jpg?height=300&width=400", alt: "Fresh produce" },
              { src: "/1.jpg?height=300&width=400", alt: "Happy farmers" },
            ].map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <Image
                  src={img.src || "/1.jpg"}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Policies Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Terms and Policies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>

                {/* Expandable Content */}
                {expanded === index && <p className="text-gray-600 mt-2">{item.details}</p>}

                {/* Learn more button */}
                <button 
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="inline-flex items-center mt-4 text-fresh-yellow-600 hover:text-fresh-yellow-700"
                >
                  {expanded === index ? "Show Less" : "Learn more"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}