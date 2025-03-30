import Image from "next/image"
import { Star, Eye } from "lucide-react"
import Link from "next/link"
import chocolate from "../../../../public/homePage/chochlate.jpg"
import gift from "../../../../public/homePage/gifts-box.webp"
import card from "../../../../public/homePage/447.jpg"
import trending from "../../../../public/homePage/trending2.jpg"

const products = [
  {
    id: 1,
    name: "Chocolate",
    image: chocolate,
    rating: 4.5,
    reviews: 222,
    originalPrice: 24.0,
    salePrice: 18.0,
  },
  {
    id: 2,
    name: "Gifts Wrapper",
    image: gift,
    rating: 4.5,
    reviews: 41,
    originalPrice: 54.0,
    salePrice: 50.0,
  },
  {
    id: 3,
    name: "Beauty Brands",
    image: trending,
    rating: 4.1,
    reviews: 32,
    originalPrice: 14.0,
    salePrice: 12.0,
  },
  {
    id: 4,
    name: "Designed Cards",
    image: card,
    rating: 4.5,
    reviews: 222,
    originalPrice: 24.0,
    salePrice: 18.0,
  },
]

export default function BestSellingProducts() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Best selling products</h2>
          <Link href={"/sign-up"}>
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            View All
          </button></Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
              {/* Product Image with Hover Effect */}
              <div className="relative aspect-square mb-4 group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md transition-opacity group-hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Quick View Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-lg">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current opacity-50" />
                  </div>
                  <span className="text-gray-500 text-sm">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-lg font-semibold">${product.salePrice.toFixed(2)}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">10% OFF</span>
                </div>

                {/* Add to Cart */}
                <div className="pt-2">
                  <Link href={"/sign-up"}>
                  <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                    Add to Cart
                  </button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

