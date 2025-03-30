import Image from "next/image" 
import Jwellery from "../../../../public/homePage/jwellery.jpg"
import wooden from "../../../../public/homePage/wooden.webp" 
import paint from "../../../../public/homePage/paint.jpg" 
import candle from "../../../../public/homePage/candle1.jpg" 
import handcraft from "../../../../public/homePage/handcraft.jpg" 
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Candles",
    image: candle,
  },
  {
    id: 2,
    name: "Jwellery",
    image: Jwellery,
  },
  {
    id: 3,
    name: "HandCrafts",
    image: handcraft,
  },
  {
    id: 4,
    name: "WoodWorking",
    image: wooden,
  },
  {
    id: 5,
    name: "Paintings and Arts",
    image: paint,
  },
]

export default function CategorySection() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Category</h2>
          <div className="flex items-center gap-4">
           <Link href={"/sign-up"}>
           <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              View All
            </button></Link>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
               <Link href={"/sign-up"}>
               <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  priority
                  className="object-cover"
                />
               </Link>
              </div>
              <h3 className="text-lg font-medium text-center group-hover:text-green-500 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

